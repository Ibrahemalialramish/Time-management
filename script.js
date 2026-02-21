document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    const toast = document.getElementById('motivational-toast');
    const toastMessage = document.getElementById('toast-message');

    const motivationalPhrases = [
        "بطل! استمر في هذا الزخم ✨",
        "كفو! رمضانك مليء بالإنجاز 🙌",
        "رهيب! أنت تقترب من هدفك اليومي 🚀",
        "عمل رائع! حافظ على هذا التركيز 💎",
        "مبدع! كل خطوة تقربك من النجاح 🌟",
        "أحسنت! الإنتاجية تليق بك 👏",
        "استمر يا بطل، أنت تصنع الفرق! 💪"
    ];

    // Initialize progress
    updateProgress();

    // Load saved state (Optional enhancement: LocalStorage)
    checkboxes.forEach((checkbox, index) => {
        const savedState = localStorage.getItem(`task-${index}`);
        if (savedState === 'true') {
            checkbox.checked = true;
        }

        checkbox.addEventListener('change', () => {
            localStorage.setItem(`task-${index}`, checkbox.checked);
            updateProgress();
            
            if (checkbox.checked) {
                checkPhaseCompletion(checkbox.dataset.phase);
            }
        });
    });

    function updateProgress() {
        const totalTasks = checkboxes.length;
        const completedTasks = document.querySelectorAll('.task-checkbox:checked').length;
        const percentage = Math.round((completedTasks / totalTasks) * 100);

        progressFill.style.width = `${percentage}%`;
        progressPercentage.textContent = `${percentage}%`;
    }

    function checkPhaseCompletion(phaseId) {
        const phaseTasks = document.querySelectorAll(`.task-checkbox[data-phase="${phaseId}"]`);
        const completedPhaseTasks = document.querySelectorAll(`.task-checkbox[data-phase="${phaseId}"]:checked`);

        if (phaseTasks.length === completedPhaseTasks.length) {
            showToast();
        }
    }

    function showToast() {
        const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
        toastMessage.textContent = randomPhrase;
        
        toast.classList.remove('hidden');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
});
