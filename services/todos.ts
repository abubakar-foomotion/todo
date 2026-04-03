export async function getAllTodos(userId: string) {
    const response = await fetch(`/api/todo?userId=${userId}`);
    const data = await response.json();
    return data;
}

export async function updateTodo(id:string, heading:string, description:string) {
    await fetch("/api/todo" , {
        method : "PUT",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            id:id,
            heading:heading,
            description:description
        })
    });
}