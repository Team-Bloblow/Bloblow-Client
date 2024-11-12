const getDate = (date) => {
  if (date === null || date === undefined) {
    return null;
  }

  const todayDate = new Date(date);

  const currentYear = todayDate.getFullYear();
  const currentMonth = todayDate.getMonth() + 1;
  const currentDate = todayDate.getDate();
  const currentDay = todayDate.getDay();
  const currentHour =
    todayDate.getHours() > 12
      ? "오후 " + (todayDate.getHours() - 12)
      : "오전 " + todayDate.getHours();
  const currentMinute = todayDate.getMinutes();

  return { currentYear, currentMonth, currentDate, currentDay, currentHour, currentMinute };
};

const changeDayFormat = (dateNumber) => {
  switch (dateNumber) {
    case 0:
      return "일요일";
    case 1:
      return "월요일";
    case 2:
      return "화요일";
    case 3:
      return "수요일";
    case 4:
      return "목요일";
    case 5:
      return "금요일";
    case 6:
      return "토요일";
    default:
      throw Error("유효하지 않은 요일 정보입니다.");
  }
};

const getCursorDate = () => {
  const date = new Date();

  if (date.getDay() !== 0) {
    date.setDate(date.getDate() - date.getDay());
  }

  date.setHours(0, 0, 0, 0);

  return date;
};

const changeDateWithDotFormat = (date) => {
  const newDate = new Date(date);
  return newDate.getFullYear() + "." + (newDate.getMonth() + 1) + "." + newDate.getDate();
};

const changeMonthDateFormat = (date) => {
  const newDate = new Date(date);
  return `${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;
};

export { getDate, changeDayFormat, getCursorDate, changeDateWithDotFormat, changeMonthDateFormat };
