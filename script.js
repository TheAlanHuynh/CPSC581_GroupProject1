document.addEventListener("DOMContentLoaded", () => {
  // Rep counter
  let repCounter = 10;
  let foodCounter = 5;

  // Function to dynamically generate the debug string
  function getDebugString() {
    return `Rep: ${repCounter}, Food: ${foodCounter}`;
  }

  // References to elements
  const joystickButton = document.getElementById("draggableButton");
  const foodButton = document.querySelector(".food-btn");
  const selfieImages = document.querySelectorAll(".selfie-img");
  const avatarImages = document.querySelectorAll(".avatar");
  // const defaultAvatar = document.querySelector("img[alt='avatar']");
  const defaultAvatar = document.getElementById("center-img");

  let centerX = joystickButton.offsetLeft;  // Start with the button's initial left position
  let centerY = joystickButton.offsetTop;   // Start with the button's initial top position

  let isDragging = false;
  let axisLocked = null;  // null until we lock to X or Y axis
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  joystickButton.addEventListener('mousedown', (e) => {
    isDragging = true;
    axisLocked = null;  // Reset axis lock when drag starts
    dragOffsetX = e.clientX - joystickButton.offsetLeft;
    dragOffsetY = e.clientY - joystickButton.offsetTop;
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
      let distanceX = e.clientX - dragOffsetX;
      let distanceY = e.clientY - dragOffsetY;

      // Determine axis lock on first movement
      if (axisLocked === null) {
          if (Math.abs(distanceX - centerX) > Math.abs(distanceY - centerY)) {
              axisLocked = 'x';  // Lock to X axis
          } else {
              axisLocked = 'y';  // Lock to Y axis
          }
      }

      // Restrict movement to X or Y axis
      if (axisLocked === 'x') {
          // Allow only horizontal movement to the right (positive X)
          let newX = Math.max(0, Math.min(100, distanceX - centerX));  // Ensure newX is between 0 and 100px
          console.log(newX);
          joystickButton.style.left = `${centerX + newX}px`;
          joystickButton.style.top = `${centerY}px`;  // Stay centered vertically
          changeImageBasedOnPosition(newX, 0);
      } else if (axisLocked === 'y') {
          // Allow only vertical movement upwards (negative Y)
          let newY = Math.max(-100, Math.min(0, distanceY - centerY));  // Ensure newY is between -100 and 0px
          console.log(newY);
          joystickButton.style.top = `${centerY + newY}px`;
          joystickButton.style.left = `${centerX}px`;  // Stay centered horizontally
          changeImageBasedOnPosition(0, newY);
      }
  }
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
      isDragging = false;

      // Snap the button back to center
      joystickButton.style.left = `${centerX}px`;
      joystickButton.style.top = `${centerY}px`;

      // Reset image to default
      avatarImages.forEach((img) => img.classList.add("hidden"));
      defaultAvatar.classList.remove("hidden");
      defaultAvatar.src = '/images/avatar.webp';
  }
});

  // Function to update the visible selfie based on rep counter
  function updateSelfie() {
    // Hide all selfie images first
    selfieImages.forEach((img) => img.classList.add("hidden"));

    console.log(getDebugString()); // Debug statement

    if (repCounter >= 17 && foodCounter >= 8) {
      // Show Fat Super Buff Selfie
      document
        .querySelector("img[alt='FatSuperBuffSelfie']")
        .classList.remove("hidden");
    } else if (repCounter >= 17 && foodCounter <= 7) {
      // Show SuperBuffSelfie
      document
        .querySelector("img[alt='SuperBuffSelfie']")
        .classList.remove("hidden");
    } else if (repCounter >= 14 && foodCounter >= 8) {
      // Show FatBuffSelfie
      document
        .querySelector("img[alt='FatBuffSelfie']")
        .classList.remove("hidden");
    } else if (repCounter >= 14 && foodCounter <= 7) {
      // Show BuffSelfie
      document
        .querySelector("img[alt='BuffSelfie']")
        .classList.remove("hidden");
    } else if (repCounter >= 7 && repCounter <= 13 && foodCounter >= 8) {
      // Show Average Selfie
      document
        .querySelector("img[alt='FatAverageSelfie']")
        .classList.remove("hidden");
    } else if (
      repCounter >= 7 &&
      repCounter <= 13 &&
      foodCounter >= 4 &&
      foodCounter <= 7
    ) {
      // Show Average Selfie
      document
        .querySelector("img[alt='AverageSelfie']")
        .classList.remove("hidden");
    } else if (repCounter <= 6 && foodCounter >= 8) {
      // Show FatScrawnySelfie
      document
        .querySelector("img[alt='FatScrawnySelfie']")
        .classList.remove("hidden");
    } else if (repCounter <= 6 && foodCounter <= 7 && foodCounter >= 4) {
      // Show LeanScrawnySelfie
      document
        .querySelector("img[alt='LeanScrawnySelfie']")
        .classList.remove("hidden");
    } else if (foodCounter <= 3) {
      // Show Scrawny Selfie
      document
        .querySelector("img[alt='ScrawnySelfie']")
        .classList.remove("hidden");
    }
  }

  function changeImageBasedOnPosition(x, y) {
    // Default to idle image only if both x and y are 0 and no axis is locked
    if (x === 0 && y === 0 && axisLocked === null) {
        defaultAvatar.src = '/Photos/treadmill-orange-cat_idle1.png';
        return;  // Exit early if the button is centered
    }

    // Check vertical (Y-axis) position and change image accordingly
    if (axisLocked === 'y') {
        if (y <= -20 && y > -40) {
            defaultAvatar.src = '/Photos/Lift/Sprite_Sheet2.png';
        } else if (y <= -40 && y > -60) {
            defaultAvatar.src = '/Photos/Lift/Sprite_Sheet3.png';
        } else if (y <= -60 && y > -80) {
            defaultAvatar.src = '/Photos/Lift/Sprite_Sheet4.png';
        } else if (y <= -80) {
            defaultAvatar.src = '/Photos/Lift/Sprite_Sheet5.png';
        } else if (y <= -100) {
            defaultAvatar.src = '/Photos/Lift/Sprite_Sheet6.png';
        }
    } else if (y <= 0 && y >-20 && axisLocked === 'y') {
        defaultAvatar.src = '/Photos/Lift/Sprite_Sheet1.png';  // First Y-axis image
    }
    if (y == -100 || y == 0) {
      repCounter += 0.5;
    }

    // Check horizontal (X-axis) position and change image accordingly
    if (axisLocked === 'x') {
        if (x >= 20 && x < 40) {
            defaultAvatar.src = '/Photos/Running/treadmill-orange_cat2.png';
        } else if (x >= 40 && x < 60) {
            defaultAvatar.src = '/Photos/Running/treadmill-orange_cat3.png';
        } else if (x >= 60 && x < 80) {
            defaultAvatar.src = '/Photos/Running/treadmill-orange_cat4.png';
        } else if (x >= 80) {
            defaultAvatar.src = '/Photos/Running/treadmill-orange_cat5.png';
        } else if (x >= 100) {
            defaultAvatar.src = '/Photos/Running/treadmill-orange_cat6.png';
        }
    } else if (x >= 0 && x < 20 && axisLocked === 'x') {
        defaultAvatar.src = '/Photos/Running/treadmill-orange_cat1.png';  // First X-axis image
    }

    if (x == 100 || x == 0) {
      repCounter += 0.5;
    }
}

  // Function to change the avatar image
  function changeAvatar() {
  //   // Hide all avatars including the default one
  //   avatarImages.forEach((img) => img.classList.add("hidden"));

     console.log(getDebugString()); // Debug statement

     defaultAvatar.src = "/images/catbite.gif"
  //   // Randomly choose between 'avatarDeadlift' or 'avatarRunning'
  //   const randomAvatar =
  //     Math.random() > 0.5 ? "avatarDeadlift" : "avatarRunning";

  //   document
  //     .querySelector(`img[alt='${randomAvatar}']`)
  //     .classList.remove("hidden");

  //   // Revert to default avatar after a set duration
    setTimeout(() => {
      // avatarImages.forEach((img) => img.classList.add("hidden"));
      // defaultAvatar.classList.remove("hidden"); // Show only the default avatar
      defaultAvatar.src = "/images/avatar.webp";
    }, 750); // 0.75 seconds
  }

  // Function to decrease rep counter over time
  function decrementCounter() {
    if (repCounter > 0) {
      repCounter -= 1;
    }

    if (foodCounter > 0) {
      foodCounter -= 1;
    }

    updateSelfie();
    selfieImages.forEach((img) => {
      if (!img.classList.contains("hidden")) {
        console.log("Visible Image: " + img.alt);
      }
    });
    console.log(getDebugString()); // Debug statement
  }

  // Initial update of the selfie
  updateSelfie();
  selfieImages.forEach((img) => {
    if (!img.classList.contains("hidden")) {
      console.log("Visible Image: " + img.alt);
    }
  });

  // Set interval to decrease counter every 2.5 seconds (2500ms)
 setInterval(decrementCounter, 2500);

  // Event listener for the joystick button click
  // joystickButton.addEventListener("click", () => {
  //   // Increment counter by 1 on each click
  //   repCounter += 1;

  //   // Update selfie based on the new counter
  //   updateSelfie();

  //   selfieImages.forEach((img) => {
  //     if (!img.classList.contains("hidden")) {
  //       console.log("Visible Image: " + img.alt);
  //     }
  //   });

  //   // Change avatar based on click
  //   changeAvatar();
  // });

  // Event Listener for the food button click
  foodButton.addEventListener("click", () => {
    // Increment counter by 1 on each click
    foodCounter += 1;

    // Update selfie based on the new counter
    updateSelfie();

    selfieImages.forEach((img) => {
      if (!img.classList.contains("hidden")) {
        console.log("Visible Image: " + img.alt);
      }
    });

    // Change avatar based on click
    changeAvatar();
  });
});