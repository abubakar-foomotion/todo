export async function getAllTodos() {
    const response = await fetch("/api/todo");
    const data = await response.json();
    return data;
}