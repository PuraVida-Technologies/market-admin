export const greeting = (): string => {
    const myDate = new Date();
    const hours = myDate.getHours();
    let greet;
  
    if (hours < 12) {
      greet = "Morning";
    } else if (hours >= 12 && hours <= 17) {
      greet = "Afternoon";
    } else {
      greet = "Evening";
    }
  
    return greet
  };
  