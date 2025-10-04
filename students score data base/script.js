
// students: 从 localStorage 读取学生数据，如果没有则为空数组
let students = JSON.parse(localStorage.getItem("students")) || [];

// 添加学生信息
function addStudent() {
    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;
    let score = document.getElementById("score").value;

    // 如果有任意一项为空，弹出警告并退出
    if (!name || !id || !score) {
        alert("Please fill out all the information. Some fields are missing!");
        return;
    }

    // 创建学生对象
    let student = { name, id, score };

    // 添加到 students 数组
    students.push(student);

    // 保存到 localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // 弹出提示已添加
    alert("Student has been added!");

    // 清空输入框
    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    document.getElementById("score").value = "";

    // 重新显示学生列表（如果页面有显示表格的话）
    displayStudents();
}

// 显示学生信息表格
function displayStudents() {
    let table = document.getElementById("studentTable");
    table.innerHTML = ""; // 清空表格

    if (students.length === 0) {
        table.innerHTML = "<tr><td colspan='5'>No students information yet</td></tr>";
        return;
    }

    // 按 score 从高到低排序
    let sortedStudents = students.slice().sort((a, b) => Number(b.score) - Number(a.score));

    // 显示表格
    sortedStudents.forEach((s) => {
        // 获取原数组索引，用于删除和编辑
        let index = students.indexOf(s);

        let row = `<tr>
            <td>${s.name}</td>
            <td>${s.id}</td>
            <td id="score-${index}">${s.score}</td>   <!-- 给分数格子加 id -->
            <td><button onclick="editStudent(${index})">Edit</button></td>
            <td><button onclick="deleteStudent(${index})">Delete</button></td>
        </tr>`;
        table.innerHTML += row;
    });
}


function deleteStudent(index) {
    students.splice(index, 1); // 删除原数组对应学生
    localStorage.setItem("students", JSON.stringify(students)); // 更新存储
    displayStudents(); // 重新显示
}
//function editStudent(index) {
//    let newScore = prompt("Enter new score:", students[index].score); // 弹窗输入
//    if (newScore !== null && newScore.trim() !== "" && !isNaN(newScore)) {
//        students[index].score = Number(newScore); // 更新分数
//        localStorage.setItem("students", JSON.stringify(students)); // 保存到 localStorage
//        displayStudents(); // 重新刷新表格
//    } else {
//        alert("Invalid score! Please enter a number.");
//    }
//}
function editStudent(index) {
    let scoreCell = document.getElementById(`score-${index}`);
    let currentScore = students[index].score;

    // 把分数替换成输入框 + Save 按钮
    scoreCell.innerHTML = `
        <input type="number" id="editScore-${index}" value="${currentScore}" style="width:60px;">
        <button onclick="saveScore(${index})">Save</button>
        <button onclick="cancelEdit(${index}, ${currentScore})">Cancel</button>
    `;
}
function saveScore(index) {
    let newScore = document.getElementById(`editScore-${index}`).value;
    if (newScore.trim() !== "" && !isNaN(newScore)) {
        students[index].score = Number(newScore);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents(); // 更新表格
    } else {
        alert("Invalid score! Please enter a number.");
    }
}

function cancelEdit(index, oldScore) {
    document.getElementById(`score-${index}`).innerHTML = oldScore;
}

function deleteStudent(index) {
    students.splice(index, 1); // 删除数组里的学生
    localStorage.setItem("students", JSON.stringify(students)); // 更新存储
    displayStudents(); // 重新显示
}

// 页面加载时显示学生信息
window.onload = displayStudents;
