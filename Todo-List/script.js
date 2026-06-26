// 기획서 데이터 구조에 맞춘 가상 DB (Local Storage 연동)
let todos = JSON.parse(localStorage.getItem('todos')) || [
    {
        id: 1,
        title: "웹 프로그래밍 과제 제출",
        content: "KAIST 깃허브 저장소에 코드 push하고 제출하기",
        due_date: "2026-06-20",
        priority: "high",
        is_completed: 0 // 0: 미완료, 1: 완료 (todos 테이블 명세 기준)
    }
];

// HTML 엘리먼트 가져오기
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

// 오늘 날짜 기본 지정
document.getElementById('todo-date').value = new Date().toISOString().substring(0, 10);

// [액션 2] 할 일 목록 조회 기능 함수
function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item priority-${todo.priority} ${todo.is_completed ? 'completed' : ''}`;
        
        const priorityText = todo.priority === 'high' ? '🔥 높음' : todo.priority === 'medium' ? '⚡ 보통' : '🌱 낮음';
        
        li.innerHTML = `
            <div class="todo-checkbox-area">
                <input type="checkbox" ${todo.is_completed ? 'checked' : ''} onchange="toggleComplete(${todo.id})">
            </div>
            <div class="todo-content-area">
                <h3>${todo.title}</h3>
                <p class="desc">${todo.content}</p>
                <div class="todo-meta">
                    <span class="due-date">📅 마감: ${todo.due_date}</span>
                    <span class="badge">중요도: ${priorityText}</span>
                </div>
            </div>
            <div class="todo-actions">
                <button class="btn-edit" onclick="editTodo(${todo.id})">수정</button>
                <button class="btn-delete" onclick="deleteTodo(${todo.id})">삭제</button>
            </div>
        `;
        todoList.appendChild(li);
    });

    // 로컬 스토리지에 저장 (새로고침해도 유지되게)
    localStorage.setItem('todos', JSON.stringify(todos));
}

// [액션 1] 새 할 일 추가(저장) 기능
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newTodo = {
        id: Date.now(), // 고유 ID 임시 생성
        title: document.getElementById('todo-title').value,
        content: document.getElementById('todo-content').value,
        due_date: document.getElementById('todo-date').value,
        priority: document.getElementById('todo-priority').value,
        is_completed: 0
    };

    todos.push(newTodo);
    renderTodos();
    todoForm.reset();
    document.getElementById('todo-date').value = new Date().toISOString().substring(0, 10);
});

// [액션 3] 특정 할 일 완료 여부 변경 함수
function toggleComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, is_completed: todo.is_completed === 1 ? 0 : 1 };
        }
        return todo;
    });
    renderTodos();
}

// [액션 4, 6] 특정 할 일 수정 함수
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const newTitle = prompt("수정할 제목을 입력하세요:", todo.title);
    if (newTitle === null) return; // 취소 클릭 시

    const newContent = prompt("수정할 내용을 입력하세요:", todo.content);
    const newDate = prompt("수정할 마감 날짜를 입력하세요 (YYYY-MM-DD):", todo.due_date);
    const newPriority = prompt("수정할 중요도를 입력하세요 (high / medium / low):", todo.priority);

    todos = todos.map(t => {
        if (t.id === id) {
            return {
                ...t,
                title: newTitle || t.title,
                content: newContent || t.content,
                due_date: newDate || t.due_date,
                priority: (newPriority === 'high' || newPriority === 'medium' || newPriority === 'low') ? newPriority : t.priority
            };
        }
        return t;
    });
    renderTodos();
}

// [액션 5] 특정 할 일 삭제 함수
function deleteTodo(id) {
    if (confirm("정말 이 할 일을 삭제하시겠습니까?")) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    }
}

// 초기 화면 로드 시 실행
renderTodos();