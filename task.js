/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {

    this.name = name;
    this.position = position;
    this.capacity = capacity;
    this.cargo = 0;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {

    var name = 'Корабль "' + this.name + '".';
    var position = 'Местоположение: ' + this.position.join(',') + '.';
    var cargo = 'Занято: ' + this.cargo + ' из ' + this.capacity + 'т.';

    console.log(name + ' ' + position + ' ' + cargo);
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {

    var freeSpace = 'На корабле свободно ' + (this.capacity - this.cargo) + 'т.';
    console.log(freeSpace);
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {

    var occupiedSpace = (this.cargo == 0) ? 'Товаров нет.' : 'В трюме занято ' + this.cargo;
    console.log(occupiedSpace);
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {

    if(newPosition.name) {
        this.position = newPosition.position.slice(0);
    } else {
        this.position = newPosition.slice(0);
    }
    console.log('Корабль ' + this.name + ' переместился в местоположение ' + this.position.join(',') + '.');
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {

    this.name = name;
    this.position = position;
    this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
    var name = 'Планета "' + this.name + '".';
    var position = 'Местоположение: ' + this.position.join(',') + '.';
    var cargo = (this.availableAmountOfCargo == 0) ? 'Грузов нет.' : 'Доступно груза ' + this.availableAmountOfCargo + 'т.';

    console.log(name + ' ' + position + ' ' + cargo);
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
    var cargo = 'На планете доступно ' + this.availableAmountOfCargo + 'т груза.';
    console.log(cargo);
}

/**
 * Загружает на корабль заданное количество груза.
 *
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {

    if(cargoWeight > this.availableAmountOfCargo) {
        console.log('На планете нет столько грузов');
        this.getAvailableAmountOfCargo();
    } else if(cargoWeight > (vessel.capacity - vessel.cargo)) {
        console.log('На корабль не поместится столько груза');
        vessel.getFreeSpace();
    } else if(this.isVesselHere(vessel)) {
        vessel.cargo += cargoWeight;
        this.availableAmountOfCargo -= cargoWeight;
        console.log('На корабль ' + vessel.name + ' погружено ' + cargoWeight + 'т груза');
    } else {
        console.log('Корабль должен приземлиться на планету перед погрузкой');
    }
}

/**
 * Выгружает с корабля заданное количество груза.
 *
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {

    if(cargoWeight > vessel.cargo) {
        console.log('На корабле нет столько груза');
        vessel.getOccupiedSpace();
    } else if(this.isVesselHere(vessel)) {
        vessel.cargo -= cargoWeight;
        this.availableAmountOfCargo += cargoWeight;
        console.log('С корабля  ' + vessel.name + ' выгружено ' + cargoWeight + 'т груза');
    } else {
        console.log('Корабль должен приземлиться на планету перед разгрузкой');
    }
}

/**
 * Проверка наличия корабля на планете
 *
 * @param {Vessel} vessel Проверяемый корабль
 * @returns {boolean}
 */
Planet.prototype.isVesselHere = function (vessel){
    if(vessel.position.length != this.position.length) {
        return false;
    } else {
        for(var i = 0, l = this.position.length; i < l; i++) {
            if(this.position[i] != vessel.position[i]) {
                return false;
            }
        }
        return true;
    }
}