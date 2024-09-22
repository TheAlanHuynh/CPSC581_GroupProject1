document.addEventListener("DOMContentLoaded", () => {
  // Rep counter
  let repCounter = 10;

  // References to elements
  const joystickButton = document.querySelector(".joystick-btn");
  const selfieImages = document.querySelectorAll(".selfie-img");
  const avatarImages = document.querySelectorAll(".avatar");
  const defaultAvatar = document.querySelector("img[alt='avatar']");

  // Function to update the visible selfie based on rep counter
  function updateSelfie() {
    // Hide all selfie images first
    selfieImages.forEach((img) => img.classList.add("hidden"));

    if (repCounter >= 14) {
      // Show SuperBuffSelfie
      document
        .querySelector("img[alt='SuperBuffSelfie']")
        .classList.remove("hidden");
    } else if (repCounter >= 12) {
      // Show BuffSelfie
      document
        .querySelector("img[alt='BuffSelfie']")
        .classList.remove("hidden");
    } else if (repCounter < 6 && repCounter > 2) {
      // Show ScrawnySelfie
      document
        .querySelector("img[alt='ScrawnySelfie']")
        .classList.remove("hidden");
    } else if (repCounter <= 2) {
      // Show SuperScrawnySelfie
      document
        .querySelector("img[alt='SuperScrawnySelfie']")
        .classList.remove("hidden");
    } else {
      // Show AverageSelfie (default)
      document
        .querySelector("img[alt='AverageSelfie']")
        .classList.remove("hidden");
    }
  }

  // Function to change the avatar image
  function changeAvatar() {
    // Hide all avatars including the default one
    avatarImages.forEach((img) => img.classList.add("hidden"));

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
      updateSelfie();
    }
  }

  // Initial update of the selfie
  updateSelfie();

  // Set interval to decrease counter every 2.5 seconds (2500ms)
  setInterval(decrementCounter, 2500);

  // Event listener for the joystick button click
  joystickButton.addEventListener("click", () => {
    repCounter += 1; // Increment counter by 1 on each click
    updateSelfie(); // Update selfie based on the new counter
    changeAvatar(); // Change avatar based on click
  });
});
