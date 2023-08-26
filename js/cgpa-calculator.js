const regulations = {
    "2018": {
        "CSE": {
            "Semester 1": 20,
            "Semester 2": 21,
            "Semester 3": 24,
            "Semester 4": 26,
            "Semester 5": 22,
            "Semester 6": 25,
            "Semester 7": 12,
            "Semester 8": 10
        },
        "ECE": {
            "Semester 1": 20,
            "Semester 2": 21,
            "Semester 3": 24,
            "Semester 4": 22,
            "Semester 5": 23,
            "Semester 6": 24,
            "Semester 7": 16,
            "Semester 8": 10
        },
        "AI-ML": {
            "Semester 1": 20,
            "Semester 2": 21,
            "Semester 3": 24,
            "Semester 4": 26,
            "Semester 5": 22,
            "Semester 6": 25,
            "Semester 7": 12,
            "Semester 8": 10
        }
    },
    "2021": {
        "CSE": {
            "Semester 1": 22,
            "Semester 2": 21,
            "Semester 3": 23,
            "Semester 4": 23,
            "Semester 5": 21,
            "Semester 6": 20,
            "Semester 7": 18,
            "Semester 8": 15
        },
        "AI-ML": {
            "Semester 1": 22,
            "Semester 2": 21,
            "Semester 3": 23,
            "Semester 4": 23,
            "Semester 5": 21,
            "Semester 6": 20,
            "Semester 7": 18,
            "Semester 8": 15
        },
        "Big Data Analytics": {
            "Semester 1": 22,
            "Semester 2": 21,
            "Semester 3": 23,
            "Semester 4": 23,
            "Semester 5": 21,
            "Semester 6": 20,
            "Semester 7": 18,
            "Semester 8": 15
        },
        "Cybersecurity": {
            "Semester 1": 22,
            "Semester 2": 21,
            "Semester 3": 23,
            "Semester 4": 23,
            "Semester 5": 21,
            "Semester 6": 20,
            "Semester 7": 18,
            "Semester 8": 15
        },
        "IT": {
            "Semester 1": 22,
            "Semester 2": 21,
            "Semester 3": 23,
            "Semester 4": 23,
            "Semester 5": 21,
            "Semester 6": 20,
            "Semester 7": 18,
            "Semester 8": 15
        },
        "ECE": {
            "Semester 1": 18,
            "Semester 2": 25,
            "Semester 3": 24,
            "Semester 4": 21,
            "Semester 5": 20,
            "Semester 6": 22,
            "Semester 7": 18,
            "Semester 8": 15
        },
        "Biotechnology": {
            "Semester 1": 18,
            "Semester 2": 25,
            "Semester 3": 23,
            "Semester 4": 23,
            "Semester 5": 22,
            "Semester 6": 19,
            "Semester 7": 18,
            "Semester 8": 15
        },
        "EEE": {
            "Semester 1": 18,
            "Semester 2": 25,
            "Semester 3": 22,
            "Semester 4": 23,
            "Semester 5": 21,
            "Semester 6": 21,
            "Semester 7": 18,
            "Semester 8": 15
        }
    }
}

const defaultRegulation = document.getElementById('regulation').value;
const courseSelect = document.getElementById('course');
courseSelect.innerHTML = '';

for (const course in regulations[defaultRegulation]) {
    const option = document.createElement('option');
    option.value = course;
    option.textContent = course;
    courseSelect.appendChild(option);
}

document.getElementById('regulation').addEventListener('change', function() {
    const selectedRegulation = this.value;
    const courseSelect = document.getElementById('course');
    courseSelect.innerHTML = '';  // Clear previous options

    for (const course in regulations[selectedRegulation]) {
        const option = document.createElement('option');
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    }
});

let semesterCount = 1; 

function addSemester() {
    semesterCount++;
    if (semesterCount <= 8) {
        const semesterDiv = document.getElementById("additional-semesters");
        const newInput = document.createElement("div");
        newInput.innerHTML = `
            <label for="semester${semesterCount}">Semester ${semesterCount} GPA:</label>
            <input type="number" id="semester${semesterCount}" step="0.01" min="0" max="4.0" required>
        `;
        semesterDiv.appendChild(newInput);
    }
}

function removeSemester() {
    if (semesterCount > 1) {
        const semesterDiv = document.getElementById("additional-semesters");
        semesterDiv.removeChild(semesterDiv.lastChild);
        semesterCount--;
    }
}

function calculateCGPA() {
    let weightedGPA = 0;
    let totalCredits = 0;

    const selectedRegulation = document.getElementById('regulation').value;
    const selectedCourse = document.getElementById('course').value;

    for (let i = 1; i <= semesterCount; i++) {
        const semesterGPA = parseFloat(document.getElementById(`semester${i}`).value);

        if (isNaN(semesterGPA)) {
            alert(`Please enter a valid GPA for Semester ${i}`);
            return;  // Exit the function if invalid data is found.
        }

        const semesterCredits = regulations[selectedRegulation][selectedCourse][i];

        weightedGPA += semesterGPA * semesterCredits;
        totalCredits += semesterCredits;
    }

    const cgpa = (weightedGPA / totalCredits).toFixed(2); 
    const cgpaElement = document.getElementById("cgpa");
    cgpaElement.textContent = `${cgpa}`;

    // Make the CGPA visible
    cgpaElement.style.opacity = "1";
    cgpaElement.style.transform = "translateY(0)";
}
