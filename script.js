document.addEventListener("DOMContentLoaded", () => {
  // Rep counter
  let repCounter = 10;
  let foodCounter = 5;

  // Function to dynamically generate the debug string
  function getDebugString() {
    return `Rep: ${repCounter}, Food: ${foodCounter}`;
  }

  // References to elements
  const joystickButton = document.querySelector(".joystick-btn");
  const foodButton = document.querySelector(".food-btn");
  const selfieImages = document.querySelectorAll(".selfie-img");
  const avatarImages = document.querySelectorAll(".avatar");
  const defaultAvatar = document.querySelector("img[alt='avatar']");

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

  // Function to change the avatar image
  function changeAvatar() {
    // Hide all avatars including the default one
    avatarImages.forEach((img) => img.classList.add("hidden"));

    console.log(getDebugString()); // Debug statement

    // Randomly choose between 'avatarDeadlift' or 'avatarRunning'
    const randomAvatar =
      Math.random() > 0.5 ? "avatarDeadlift" : "avatarRunning";

    document
      .querySelector(`img[alt='${randomAvatar}']`)
      .classList.remove("hidden");

    // Revert to default avatar after a set duration
    setTimeout(() => {
      avatarImages.forEach((img) => img.classList.add("hidden"));
      defaultAvatar.classList.remove("hidden"); // Show only the default avatar
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
  joystickButton.addEventListener("click", () => {
    // Increment counter by 1 on each click
    repCounter += 1;

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
