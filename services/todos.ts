export async function getAllTodos(userId: string) {
  const response = await fetch(`/api/todo?userId=${userId}`);
  const data = await response.json();
  return data;
}

export async function updateTodo(
  id: string,
  heading: string,
  description: string,
) {
  await fetch("/api/todo", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      heading: heading,
      description: description,
    }),
  });
}

export async function postNewUser(name: string, email: string) {
  const res = await fetch("/api/user", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, name, type: "signUp" }),
  });
  const jsonResponse = await res.json();
  return jsonResponse;
}

export async function getExistingUser(name: string, email: string) {
    const res = await fetch("/api/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email, name, type: "signIn" }),
        });
        const jsonResponse = await res.json();
        return jsonResponse;
}