let todos = [];

//function untuk memvalidasi input
function validateInput() {
    const taskInput = document.getElementById("task");
    const dueDate = document.getElementById("due-date");
    
    //jika task kosong, tampilkan alert
    if (taskInput.value.trim() === "") {
        alert("Task cannot be empty.");
        return false;
    }
    //jika due date kosong, tampilkan alert
    if (dueDate.value === "") {
        alert("Due date cannot be empty.");
        return false;
    }
    return true; //input valid
}

//function untuk menambah todo
function addTodo() {
    const taskInput = document.getElementById("task"); //ambil elemen input task
    const dueDate = document.getElementById("due-date"); //ambil elemen input due date
    
    //validasi input
    if (validateInput()) {
        let todo = {task: taskInput.value, dueDate: dueDate.value};
        todos.push(todo); //tambah todo ke array
        alert("Task telah ditambahkan!");
        displayTodos(); //tampilkan ulang daftar todo
    }
}
function displayTodos() {
    const tbody = document.querySelector("#todo-table tbody");
    const noTodosPlaceholder = document.getElementById("no-todos-placeholder");

    Array.from(tbody.querySelectorAll("tr")).forEach(tr => {
        if (tr.id !== "no-todos-placeholder") {
            tr.remove();
        }
    });

    if (todos.length === 0) {
        // kalau tidak ada todo maka tampilkan placeholder
        noTodosPlaceholder.style.display = "table-row";
        tbody.appendChild(noTodosPlaceholder);
    } else {
        // kalau ada todo sembunyikan placeholder
        noTodosPlaceholder.style.display = "none";

        todos.forEach((todo, index) => {
            let row = document.createElement("tr");
            // buat baris baru untuk setiap todo
            row.innerHTML = `
                <td class="text-pink-300 border border-pink-300 p-2">${todo.task}</td>
                <td class="text-pink-300 border border-pink-300 p-2">${todo.dueDate}</td>
                <td class="text-pink-300 border border-pink-300 p-2">
                    <button class="bg-orange-600 border border-gray-900 text-white p-1 rounded-lg mr-2" onclick="editTodo(${index})">Edit</button>
                    <button class="bg-rose-500 border border-gray-900 text-white p-1 rounded-lg" onclick="deleteTodo(${index})">Delete</button>
                </td>
            `;

            tbody.appendChild(row); // tambahkan baris ke tabel
        });
    }
}

//function untuk menghapus semua todo
function deleteAll() {
    todos = []; //kosongkan array todos
    displayTodos(); //tampilkan ulang daftar todo
    alert("All tasks have been deleted!");
}

//function untuk menghapus todo
function deleteTodo(index) {
    todos.splice(index, 1); //hapus todo dari array
    displayTodos(); //tampilkan ulang daftar todo
    alert("Task has been deleted!");
}

//function untuk mengedit todo
function editTodo(index) {
    const newTask = prompt("Enter the new task:", todos[index].task);
    const newDueDate = prompt("Enter the new due date (YYYY-MM-DD):", todos[index].dueDate);
    
    //validasi input
    if (newTask !== null && newTask.trim() !== "" && newDueDate !== null && newDueDate.trim() !== "") {
        todos[index] = {task: newTask, dueDate: newDueDate}; //update todo di array
        displayTodos(); //tampilkan ulang daftar todo
        alert("Task has been updated!");
    } else {
        alert("Invalid input. Task not updated.");
    }
}

//fungsi Filter/Sort
function sortTodos() {
    const sortOption = document.getElementById("sort-option").value;
    if(sortOption === "task") {
        // Urutkan berdasarkan nama task (A-Z)
        todos.sort((a, b) => a.task.localeCompare(b.task));
    }else if(sortOption === "dueDate") {
        // Urutkan berdasarkan due date (lebih dekat dulu)
        todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    displayTodos(); // tampilkan ulang setelah diurutkan
}
