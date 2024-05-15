export const TrendButtons = () => {
  const trendButtons = `
    <div class="trendingHeading container">
        <div class="buttonTitle">
          <h2>Trending</h2>
          <div class="buttons">
              <button class="trendBtn chosen" name="day"><span>Today</span></button>
              <button class="trendBtn" name="week"><span>This Week</span></button>
          </div>
        </div>
        <div class="sliderButons">
            <button class="handle handle-left">
              <i class='bx bxs-chevron-left'></i>
            </button>
            <button class="handle handle-right">
              <i class='bx bxs-chevron-right'></i>
            </button>
        </div>
    </div>
    `;

  return trendButtons;
};
