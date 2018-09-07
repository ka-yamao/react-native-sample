const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'CMP':
      return state.map(
        todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DEL':
      return state.filter(todo => {
        return todo.id !== action.id;
      });
    default:
      return state;
  }
};

export default todos;
