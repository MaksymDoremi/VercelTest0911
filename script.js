const milestones = [10, 100, 200, 500, 1000];
const counter = document.querySelector("#counter");
const clickButton = document.querySelector("#click-button");
const progressLabel = document.querySelector("#progress-label");
const progressTrack = document.querySelector("#progress-track");
const progressFill = document.querySelector("#progress-fill");
const achievementAnnouncement = document.querySelector("#achievement-announcement");
const achievementCards = [...document.querySelectorAll(".achievement-card")];
const numberFormat = new Intl.NumberFormat();

let clickCount = 0;

function updateProgress() {
  const nextMilestone = milestones.find((milestone) => clickCount < milestone);

  if (nextMilestone === undefined) {
    progressLabel.textContent = "All 1,000 clicks collected!";
    progressTrack.setAttribute("aria-valuenow", "100");
    progressFill.style.width = "100%";
    return;
  }

  const previousMilestone = milestones[milestones.indexOf(nextMilestone) - 1] ?? 0;
  const progress = ((clickCount - previousMilestone) / (nextMilestone - previousMilestone)) * 100;

  progressLabel.textContent = `${numberFormat.format(nextMilestone)} clicks`;
  progressTrack.setAttribute("aria-valuenow", String(Math.round(progress)));
  progressFill.style.width = `${progress}%`;
}

function updateAchievements() {
  for (const card of achievementCards) {
    const threshold = Number(card.dataset.threshold);
    const unlocked = clickCount >= threshold;

    if (unlocked && !card.classList.contains("is-unlocked")) {
      achievementAnnouncement.textContent = `Achievement unlocked: ${card.querySelector("h3").textContent}! ${numberFormat.format(threshold)} clicks. Congratulations!`;
    }

    card.classList.toggle("is-unlocked", unlocked);
    card.querySelector(".achievement-status").textContent = unlocked ? "Earned!" : "Locked";
  }
}

function handleClick() {
  clickCount += 1;
  counter.textContent = numberFormat.format(clickCount);
  updateProgress();
  updateAchievements();
}

clickButton.addEventListener("click", handleClick);
updateProgress();
