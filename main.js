var vessel = new Vessel('Яндекс', [0,0], 1000);
var planetA = new Planet('A', [0,0], 0);
var planetB = new Planet('B', [100, 100], 5000);

// Проверка текущего состояния
vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 0 из 1000т.
planetA.report(); // Планета "A". Местоположене: 0,0. Грузов нет.
planetB.report(); // Планета "B". Местоположене: 100,100. Доступно груза: 5000т.

vessel.flyTo(planetB);
planetB.loadCargoTo(vessel, 1000);
vessel.report(); // Корабль "Яндекс". Местоположение: 100,100. Занято: 1000 из 1000т.

vessel.flyTo(planetA);
planetA.unloadCargoFrom(vessel, 500);
vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 500 из 1000т.
planetA.report(); // Планета "A". Местоположение: 0,0. Доступно груза: 500т.
planetB.report(); // Планета "B". Местоположение: 100,100. Доступно груза: 4000т.