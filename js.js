document.addEventListener("DOMContentLoaded", function () {
  const thumb = document.querySelector(".thumb");
  const track = document.querySelector(".track");
  const divisor = document.querySelector(".divisor");
  const tick = document.querySelector(".tick");
  const sliderContainer = document.querySelector(".slider-container");
  const min = 0;
  const max = 100;

  let isDragging = false;
  let currentValue = 50;

  function updateSlider(value) {
    const percent = ((value - min) / (max - min)) * 100;
    thumb.style.left = `${percent}%`;
    divisor.style.width = `${percent}%`;
    tick.textContent = value;
    tick.style.left = `${percent}%`;
    currentValue = value;
  }

  thumb.addEventListener("mouseenter", function () {
    tick.style.display = "block";
  });

  thumb.addEventListener("mouseleave", function () {
    if (!isDragging) {
      tick.style.display = "none";
    }
  });

  thumb.addEventListener("mousedown", function (e) {
    isDragging = true;
    tick.style.display = "block";
    e.preventDefault();
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;

    const trackRect = track.getBoundingClientRect();
    let position = e.clientX - trackRect.left;
    position = Math.max(0, Math.min(position, trackRect.width));
    const percent = (position / trackRect.width) * 100;
    const value = Math.round(min + (max - min) * (percent / 100));

    updateSlider(value);
  });

  document.addEventListener("mouseup", function () {
    if (isDragging) {
      isDragging = false;
      setTimeout(() => {
        if (!thumb.matches(":hover")) {
          tick.style.display = "none";
        }
      }, 100);
    }
  });

  track.addEventListener("click", function (e) {
    const trackRect = track.getBoundingClientRect();
    const position = e.clientX - trackRect.left;
    const percent = (position / trackRect.width) * 100;
    const value = Math.round(min + (max - min) * (percent / 100));

    updateSlider(value);
    tick.style.display = "block";
    setTimeout(() => {
      if (!thumb.matches(":hover")) {
        tick.style.display = "none";
      }
    }, 1000);
  });

  updateSlider(currentValue);
});