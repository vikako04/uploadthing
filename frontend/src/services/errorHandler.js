export const handleApiError = (error) => {
  if (error.response) {
    // Сервер ответил с кодом ошибки
    const { status, data } = error.response;
    switch (status) {
      case 400:
        return "Неверные данные запроса";
      case 401:
        return "Сессия истекла - требуется повторный вход";
      case 500:
        return "Ошибка сервера";
      default:
        return data.message || "Неизвестная ошибка";
    }
  } else if (error.request) {
    // Запрос был сделан, но ответ не получен
    return "Нет ответа от сервера";
  } else {
    // Ошибка в настройках запроса
    return "Ошибка формирования запроса";
  }
};
