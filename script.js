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

  let centerX = joystickButton.offsetLeft; // Start with the button's initial left position
  let centerY = joystickButton.offsetTop; // Start with the button's initial top position

  let isDragging = false;
  let axisLocked = null; // null until we lock to X or Y axis
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  let topReached = false;
  let bottomReached = false;
  let leftReached = false;
  let rightReached = false;
  
  // Event listeners for putting mouse down on the joystick button
  joystickButton.addEventListener("mousedown", (e) => {
    // Reset booleans and axis lock when drag starts
    isDragging = true;
    axisLocked = null;
    topReached = false;
    bottomReached = false;
    leftReached = false;
    rightReached = false;
    dragOffsetX = e.clientX - joystickButton.offsetLeft;
    dragOffsetY = e.clientY - joystickButton.offsetTop;
    e.preventDefault();
  });

  // Event listeners for moving the joystick button
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      let distanceX = e.clientX - dragOffsetX;
      let distanceY = e.clientY - dragOffsetY;

      // Determine axis lock on first movement
      if (axisLocked === null) {
        if (Math.abs(distanceX - centerX) > Math.abs(distanceY - centerY)) {
          axisLocked = "x"; // Lock to X axis
        } else {
          axisLocked = "y"; // Lock to Y axis
        }
      }

      // Restrict movement to X or Y axis
      if (axisLocked === "x") {
        // Allow only horizontal movement to the right (positive X)
        let newX = Math.max(0, Math.min(100, distanceX - centerX)); // Ensure newX is between 0 and 100px
        console.log(newX);
        joystickButton.style.left = `${centerX + newX}px`;
        joystickButton.style.top = `${centerY}px`; // Stay centered vertically
        changeImageBasedOnPosition(newX, 0);

        if (newX === 100 && !rightReached) {
          rightReached = true;
          leftReached = false;
        } else if (newX === 0 && !leftReached) {
          leftReached = true;
          rightReached = false;
          // repCounter++; // Full rep completed
          if (foodCounter >= 1) {
            foodCounter--;
          }
          updateSelfie();
          console.log("Rep complete. Rep counter:", repCounter);
          console.log("Run complete. Food counter:", repCounter);
        }
      } else if (axisLocked === "y") {
        // Allow only vertical movement upwards (negative Y)
        let newY = Math.max(-100, Math.min(0, distanceY - centerY)); // Ensure newY is between -100 and 0px
        console.log(newY);
        joystickButton.style.top = `${centerY + newY}px`;
        joystickButton.style.left = `${centerX}px`; // Stay centered horizontally
        changeImageBasedOnPosition(0, newY);

        if (newY === -100 && !topReached) {
          topReached = true;
          bottomReached = false;
        } else if (newY === 0 && !bottomReached) {
          bottomReached = true;
          topReached = false;
          repCounter++; // Full rep completed
          updateSelfie();
          console.log("Rep complete. Rep counter:", repCounter);
        }
      }
    }
  });

  // Event listener for taking mouse off joystick button
  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;

      // Snap the button back to center
      joystickButton.style.left = `${centerX}px`;
      joystickButton.style.top = `${centerY}px`;

      // Reset image to default
      avatarImages.forEach((img) => img.classList.add("hidden"));
      defaultAvatar.classList.remove("hidden");
      defaultAvatar.src = "/images/avatar.webp";
    }
  });

  // Function to update the visible selfie based on rep counter
  function updateSelfie() {
    // Hide all selfie images first
    selfieImages.forEach((img) => img.classList.add("hidden"));

    console.log(getDebugString()); // Debug statement

    if (foodCounter <= 3) {
      // Show Scrawny Selfie
      document
        .querySelector("img[alt='ScrawnySelfie']")
        .classList.remove("hidden");
    } else if (repCounter >= 17 && foodCounter >= 8) {
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
      // Show Fat Average Selfie
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
    }
  }

  // function to change what the avatar is doing and what step it is at based on the position of the joystick
  function changeImageBasedOnPosition(x, y) {
    // Default to idle image only if both x and y are 0 and no axis is locked
    if (x === 0 && y === 0 && axisLocked === null) {
      defaultAvatar.src = "/Photos/treadmill-orange-cat_idle1.png";
      return; // Exit early if the button is centered
    }

    // Check vertical (Y-axis) position and change lifting image accordingly
    if (axisLocked === "y") {
      if (y <= -20 && y > -40) {
        defaultAvatar.src = "/Photos/Lift/Sprite_Sheet2.png";
      } else if (y <= -40 && y > -60) {
        defaultAvatar.src = "/Photos/Lift/Sprite_Sheet3.png";
      } else if (y <= -60 && y > -80) {
        defaultAvatar.src = "/Photos/Lift/Sprite_Sheet4.png";
      } else if (y <= -80) {
        defaultAvatar.src = "/Photos/Lift/Sprite_Sheet5.png";
      } else if (y <= -100) {
        defaultAvatar.src = "/Photos/Lift/Sprite_Sheet6.png";
      }
    } else if (y <= 0 && y > -20 && axisLocked === "y") {
      defaultAvatar.src = "/Photos/Lift/Sprite_Sheet1.png"; // First Y-axis image
    }

    // Check horizontal (X-axis) position and change running image accordingly
    if (axisLocked === "x") {
      if (x >= 20 && x < 40) {
        defaultAvatar.src = "/Photos/Running/treadmill-orange_cat2.png";
      } else if (x >= 40 && x < 60) {
        defaultAvatar.src = "/Photos/Running/treadmill-orange_cat3.png";
      } else if (x >= 60 && x < 80) {
        defaultAvatar.src = "/Photos/Running/treadmill-orange_cat4.png";
      } else if (x >= 80) {
        defaultAvatar.src = "/Photos/Running/treadmill-orange_cat5.png";
      } else if (x >= 100) {
        defaultAvatar.src = "/Photos/Running/treadmill-orange_cat6.png";
      }
    } else if (x >= 0 && x < 20 && axisLocked === "x") {
      defaultAvatar.src = "/Photos/Running/treadmill-orange_cat1.png"; // First X-axis image
    }

  }

  // Function to change the avatar image
  function changeAvatar() {
    defaultAvatar.src = "/images/catbite.gif";

    // Revert to default avatar after a set duration
    setTimeout(() => {
      defaultAvatar.src = "/images/avatar.webp";
    }, 750);

    // Debug statement
    console.log(getDebugString());
  }

  // Function to decrease rep counter over time
  function decrementCounter() {
    // Decrement reps
    if (repCounter > 0) {
      repCounter -= 1;
    }

    // Decrement food
    if (foodCounter > 0) {
      foodCounter -= 1;
    }

    // update selfie image
    updateSelfie();

    // Debug statements
    selfieImages.forEach((img) => {
      if (!img.classList.contains("hidden")) {
        console.log("Visible Image: " + img.alt);
      }
    });
    console.log(getDebugString());
  }

  // Initial update of the selfie
  updateSelfie();

  // Debug Statement
  selfieImages.forEach((img) => {
    if (!img.classList.contains("hidden")) {
      console.log("Visible Image: " + img.alt);
    }
  });

  // Set interval to decrease counter every 5 seconds
  setInterval(decrementCounter, 5000);

  // Event Listener for the food button click
  foodButton.addEventListener("click", () => {
    // Increment counter by 1 on each click
    foodCounter += 1;

    // Update selfie based on the new counter
    updateSelfie();

    // Change avatar based on click
    changeAvatar();

    // Debug statement
    selfieImages.forEach((img) => {
      if (!img.classList.contains("hidden")) {
        console.log("Visible Image: " + img.alt);
      }
    });
  });
});
