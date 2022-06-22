const container = document.querySelector('.container');
const Plots = document.querySelectorAll('.row .Plot:not(.Booked');
const count = document.getElementById('count');
const total = document.getElementById('total');
const SiteSelect = document.getElementById('Site');






populateUI();
let ticketPrice = +SiteSelect.value;


function setSiteData(SiteIndex, SitePrice) {
  localStorage.setItem('selectedSiteIndex', SiteIndex);
  localStorage.setItem('selectedSitePrice', SitePrice);
}


function updateSelectedCount() {
  const selectedPlots = document.querySelectorAll('.row .Plot.selected');

  const PlotsIndex = [...selectedPlots].map((Plot) => [...Plots].indexOf(Plot));

  localStorage.setItem('selectedPlots', JSON.stringify(PlotsIndex));



  const selectedPlotsCount = selectedPlots.length;

  count.innerText = selectedPlotsCount;
  total.innerText = selectedPlotsCount * ticketPrice;

}


function populateUI() {
  const selectedPlots = JSON.parse(localStorage.getItem('selectedPlots'));
  if (selectedPlots !== null && selectedPlots.length > 0) {
    Plots.forEach((Plot, index) => {
      if (selectedPlots.indexOf(index) > -1) {
        Plot.classList.add('selected');
      }
    });
  }

  const selectedSiteIndex = localStorage.getItem('selectedSiteIndex');

  if (selectedSiteIndex !== null) {
    SiteSelect.selectedIndex = selectedSiteIndex;
  }
}



SiteSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setSiteData(e.target.selectedIndex, e.target.value);
 //updateSelectedCount();
});



container.addEventListener('click', (e) => {
  if (e.target.classList.contains('Plot') && !e.target.classList.contains('Booked')) {
    e.target.classList.toggle('Selected');

    updateSelectedCount();
  }
});

 updateSelectedCount();

 