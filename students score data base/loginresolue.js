let students = JSON.parse(localStorage.getItem("students")) || [];

function login() {
    let id = document.getElementById("studentId").value.trim();
    if (!id) {
        alert("Please enter your ID");
        return;
    }

    // 查找学生
    let student = students.find(s => s.id === id);

    if (student) {
        document.getElementById("result").innerHTML =
            `Welcome, ${student.name}!<br>Your score is: <b>${student.score}</b>`;
    } else {
        document.getElementById("result").innerHTML =
            `<span style="color:red;">Student not found. Please check your ID.</span>`;
    }
}
    