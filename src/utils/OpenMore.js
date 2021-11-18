export const openMore = (width, numberOfMovies, cardList) => {
  if (width > 1279) {
    numberOfMovies = numberOfMovies + 3;
  } else {
    numberOfMovies = numberOfMovies + 2;
  }
  if (numberOfMovies <= cardList.length) {
    for (let i = 0; i < numberOfMovies; i++) {
      cardList[i].style.display = "block";
    }
  } else {
    for (let i = 0; i < cardList.length; i++) {
      cardList[i].style.display = "block";
    }
  }
  return numberOfMovies || cardList;
};
