const LS_KEY_USERS = "frb_users";
const LS_KEY_CURRENT = "frb_current_user";

export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY_USERS) || "[]");
  } catch {
    return [];
  }
};

export const saveUsers = (users) => {
  localStorage.setItem(LS_KEY_USERS, JSON.stringify(users));
};

export const findUserByEmail = (email) => {
  if (!email) return null;
  const users = getUsers();
  return (
    users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
  );
};

export const addUser = ({ name, email, password }) => {
  const users = getUsers();
  if (findUserByEmail(email)) return { error: "Email already registered" };

  const newUser = {
    id: Date.now().toString(),
    name: (name || "").trim(),
    email: (email || "").trim().toLowerCase(),
    password: password || "", // NOTE: plain text — for local/test only
    entries: 0,
    joined: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  return { user: newUser };
};

export const validateCredentials = (email, password) => {
  const user = findUserByEmail(email);
  if (!user) return { error: "User not found" };
  if (user.password !== password) return { error: "Invalid password" };
  return { user };
};

export const incrementEntries = (userId) => {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;
  users[idx].entries = (users[idx].entries || 0) + 1;
  saveUsers(users);
  return users[idx];
};

/* current-device user (single active session on this browser) */
export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY_CURRENT) || "null");
  } catch {
    return null;
  }
};

export const setCurrentUser = (user) => {
  try {
    localStorage.setItem(LS_KEY_CURRENT, JSON.stringify(user));
  } catch (err) {
    console.error("failed to set current user", err);
  }
};

export const clearCurrentUser = () => {
  try {
    localStorage.removeItem(LS_KEY_CURRENT);
  } catch (err) {
    console.error("failed to clear current user", err);
  }
};
