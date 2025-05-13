document.addEventListener('DOMContentLoaded', () => {
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resetBtn = document.getElementById('reset-btn');
    const setTimeInput = document.getElementById('set-time');

    let timerInterval;
    let totalSeconds = 0;
    let initialSetTimeInSeconds = parseInt(setTimeInput.value) * 60; // Initial time from input

    function updateDisplay() {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        minutesDisplay.textContent = String(mins).padStart(2, '0');
        secondsDisplay.textContent = String(secs).padStart(2, '0');
    }

    function startTimer() {
        if (timerInterval) return; // Already running

        // If timer is at 00:00 or not set, use the input value
        if (totalSeconds <= 0) {
            initialSetTimeInSeconds = parseInt(setTimeInput.value) * 60;
            if (isNaN(initialSetTimeInSeconds) || initialSetTimeInSeconds <= 0) {
                alert("กรุณาตั้งเวลาเป็นนาทีที่ถูกต้อง (ตัวเลขมากกว่า 0)");
                setTimeInput.value = Math.floor(initialSetTimeInSeconds / 60) || 5; // Revert or default
                return;
            }
            totalSeconds = initialSetTimeInSeconds;
        }
        
        updateDisplay();

        timerInterval = setInterval(() => {
            totalSeconds--;
            updateDisplay();

            if (totalSeconds < 0) { // Changed to < 0 to display 00:00 before alert
                clearInterval(timerInterval);
                timerInterval = null;
                totalSeconds = 0; // Ensure it doesn't go negative
                updateDisplay(); // Show 00:00
                alert("หมดเวลาแล้ว! 💖✨");
                // Optionally play a sound here
                // e.g., new Audio('path/to/anime_sound_effect.mp3').play();
                resetTimerToInitialSetTime(); // Reset to the time that was set
            }
        }, 1000);
        startBtn.disabled = true;
        stopBtn.disabled = false;
        setTimeInput.disabled = true;
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        // setTimeInput.disabled = false; // Keep disabled until reset for clarity
    }

    function resetTimerToInitialSetTime() {
        stopTimer();
        totalSeconds = initialSetTimeInSeconds; // Reset to the last successfully set time
        updateDisplay();
        startBtn.disabled = false;
        stopBtn.disabled = true;
        setTimeInput.disabled = false;
    }

    // Initialize
    totalSeconds = initialSetTimeInSeconds;
    updateDisplay();
    stopBtn.disabled = true;

    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimerToInitialSetTime);

    setTimeInput.addEventListener('change', () => {
        if (!timerInterval) { // Only allow changing time if timer is not running
            let newInitialMinutes = parseInt(setTimeInput.value);
            if (isNaN(newInitialMinutes) || newInitialMinutes <= 0) {
                alert("กรุณาใส่จำนวนนาทีเป็นตัวเลขบวกค่ะ");
                setTimeInput.value = Math.floor(initialSetTimeInSeconds / 60); // Revert to old value
                return;
            }
            initialSetTimeInSeconds = newInitialMinutes * 60;
            totalSeconds = initialSetTimeInSeconds;
            updateDisplay();
        }
    });
});