// Dashboard functionality
document.addEventListener('DOMContentLoaded', () => {
    // Display user information
    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail') || 'user@example.com';
    const userEmailElements = document.querySelectorAll('.user-email');
    userEmailElements.forEach(element => {
        element.textContent = userEmail;
    });
    
    // Initialize charts
    initializeCharts();
    
    // Refresh button functionality
    const refreshButton = document.getElementById('refresh-data');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            this.classList.add('rotating');
            
            // Simulate data refresh
            setTimeout(() => {
                updateCharts();
                this.classList.remove('rotating');
                
                // Show success toast
                showToast('Data refreshed successfully!', 'success');
            }, 1500);
        });
    }
    
    // Date range change handler
    const dateRange = document.getElementById('date-range');
    if (dateRange) {
        dateRange.addEventListener('change', function() {
            // Simulate data update for different time periods
            updateCharts(this.value);
            
            // Show info toast
            showToast(`Data updated for ${this.options[this.selectedIndex].text}`, 'info');
        });
    }
    
    // Add rotation animation for refresh button
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotating {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        .rotating {
            animation: rotating 1s linear infinite;
        }
    `;
    document.head.appendChild(style);
});

// Toast notification system
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
        
        // Add toast container styles
        const style = document.createElement('style');
        style.textContent = `
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
            }
            
            .toast {
                min-width: 250px;
                margin-bottom: 10px;
                padding: 15px 20px;
                border-radius: 8px;
                background-color: white;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                animation: slideInRight 0.3s ease forwards;
            }
            
            .toast.slide-out {
                animation: slideOutRight 0.3s ease forwards;
            }
            
            .toast-icon {
                margin-right: 10px;
                font-size: 1.2rem;
            }
            
            .toast-content {
                flex: 1;
            }
            
            .toast-close {
                cursor: pointer;
                font-size: 0.9rem;
                opacity: 0.5;
                transition: opacity 0.3s ease;
            }
            
            .toast-close:hover {
                opacity: 1;
            }
            
            .toast.info .toast-icon {
                color: #3498db;
            }
            
            .toast.success .toast-icon {
                color: #2ecc71;
            }
            
            .toast.warning .toast-icon {
                color: #f39c12;
            }
            
            .toast.error .toast-icon {
                color: #e74c3c;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Set icon based on type
    let icon;
    switch (type) {
        case 'success':
            icon = 'fa-check-circle';
            break;
        case 'warning':
            icon = 'fa-exclamation-triangle';
            break;
        case 'error':
            icon = 'fa-times-circle';
            break;
        default:
            icon = 'fa-info-circle';
    }
    
    // Set toast content
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${icon}"></i></div>
        <div class="toast-content">${message}</div>
        <div class="toast-close"><i class="fas fa-times"></i></div>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Add close functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.add('slide-out');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add('slide-out');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }, 5000);
}

// Chart initialization
function initializeCharts() {
    // Activity chart
    const activityChart = document.getElementById('activityChart');
    if (activityChart) {
        const activityData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Tasks Completed',
                data: [18, 25, 14, 20, 29, 12, 10],
                backgroundColor: 'rgba(94, 23, 235, 0.2)',
                borderColor: '#5e17eb',
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: '#5e17eb',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#5e17eb',
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Hours Logged',
                data: [8, 7.5, 8, 9, 7, 4, 3],
                backgroundColor: 'rgba(255, 107, 107, 0.2)',
                borderColor: '#ff6b6b',
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: '#ff6b6b',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ff6b6b',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        };
        
        new Chart(activityChart, {
            type: 'line',
            data: activityData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            font: {
                                family: "'Poppins', sans-serif",
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleFont: {
                            family: "'Poppins', sans-serif",
                            size: 13
                        },
                        bodyFont: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        },
                        padding: 10,
                        cornerRadius: 6
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            borderDash: [3, 3],
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                family: "'Poppins', sans-serif",
                                size: 11
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                family: "'Poppins', sans-serif",
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Project status chart
    const projectChart = document.getElementById('projectChart');
    if (projectChart) {
        const projectData = {
            labels: ['In Progress', 'Completed', 'Pending', 'Canceled'],
            datasets: [{
                data: [42, 28, 15, 5],
                backgroundColor: [
                    '#4e73df',
                    '#1cc88a',
                    '#f6c23e',
                    '#e74a3b'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        };
        
        new Chart(projectChart, {
            type: 'doughnut',
            data: projectData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: "'Poppins', sans-serif",
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleFont: {
                            family: "'Poppins', sans-serif",
                            size: 13
                        },
                        bodyFont: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        },
                        padding: 10,
                        cornerRadius: 6,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.formattedValue;
                                const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                                const percentage = Math.round((context.raw / total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Update charts based on selected time period
function updateCharts(timeRange = 'week') {
    // Activity chart data for different time periods
    const activityDataMap = {
        today: {
            labels: ['9AM', '11AM', '1PM', '3PM', '5PM', '7PM', '9PM'],
            datasets: [{
                label: 'Tasks Completed',
                data: [3, 5, 7, 4, 6, 2, 1],
                backgroundColor: 'rgba(94, 23, 235, 0.2)',
                borderColor: '#5e17eb',
                borderWidth: 2,
                tension: 0.4
            }, {
                label: 'Hours Logged',
                data: [1, 2, 2, 1.5, 2, 1, 0.5],
                backgroundColor: 'rgba(255, 107, 107, 0.2)',
                borderColor: '#ff6b6b',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        week: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Tasks Completed',
                data: [18, 25, 14, 20, 29, 12, 10],
                backgroundColor: 'rgba(94, 23, 235, 0.2)',
                borderColor: '#5e17eb',
                borderWidth: 2,
                tension: 0.4
            }, {
                label: 'Hours Logged',
                data: [8, 7.5, 8, 9, 7, 4, 3],
                backgroundColor: 'rgba(255, 107, 107, 0.2)',
                borderColor: '#ff6b6b',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        month: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Tasks Completed',
                data: [85, 102, 92, 78],
                backgroundColor: 'rgba(94, 23, 235, 0.2)',
                borderColor: '#5e17eb',
                borderWidth: 2,
                tension: 0.4
            }, {
                label: 'Hours Logged',
                data: [35, 40, 38, 32],
                backgroundColor: 'rgba(255, 107, 107, 0.2)',
                borderColor: '#ff6b6b',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        year: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Tasks Completed',
                data: [320, 340, 360, 330, 390, 400, 380, 370, 350, 320, 300, 310],
                backgroundColor: 'rgba(94, 23, 235, 0.2)',
                borderColor: '#5e17eb',
                borderWidth: 2,
                tension: 0.4
            }, {
                label: 'Hours Logged',
                data: [150, 155, 160, 158, 165, 170, 168, 162, 155, 148, 145, 150],
                backgroundColor: 'rgba(255, 107, 107, 0.2)',
                borderColor: '#ff6b6b',
                borderWidth: 2,
                tension: 0.4
            }]
        }
    };
    
    // Project status data for different time periods
    const projectDataMap = {
        today: {
            data: [5, 3, 2, 0],
        },
        week: {
            data: [42, 28, 15, 5],
        },
        month: {
            data: [160, 120, 45, 15],
        },
        year: {
            data: [520, 480, 100, 40],
        }
    };
    
    // Update activity chart
    const activityChart = Chart.getChart('activityChart');
    if (activityChart && activityDataMap[timeRange]) {
        activityChart.data.labels = activityDataMap[timeRange].labels;
        activityChart.data.datasets.forEach((dataset, i) => {
            dataset.data = activityDataMap[timeRange].datasets[i].data;
        });
        activityChart.update();
    }
    
    // Update project chart
    const projectChart = Chart.getChart('projectChart');
    if (projectChart && projectDataMap[timeRange]) {
        projectChart.data.datasets[0].data = projectDataMap[timeRange].data;
        projectChart.update();
    }
}
