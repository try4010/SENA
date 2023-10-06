export class CRUD { // Declaramos la clase CRUD    
    #tableName = null; // Nombre de la tabla
    #data = null; // Datos de la tabla
    constructor(tableName = undefined) { // Constructor
      this.#setTableName(tableName);
      this.#setData();
    }
    #setTableName(tableName) { // Establece el nombre de la tabla
      this.#tableNameValidate(tableName);
      this.#tableName = tableName;
    }
    #setData() { // Obtiene los datos de la tabla
      let dataRepository = this.#get(this.#tableName);
      this.#data = dataRepository === null ? [] : dataRepository;
    }
    #tableNameValidate(tableName) { // Valida el nombre de la tabla
      if (tableName === undefined) throw new Error("Table name required");
    }
    #save() { // Guarda los datos de la tabla
      let dataToSave = JSON.stringify(this.#data);
      sessionStorage.setItem(this.#tableName, dataToSave);
    }
    #get(key) { // Obtiene los datos de la tabla del almacenamiento local
      let data = sessionStorage.getItem(key);
      return JSON.parse(data);
    }
    #existElementWithId(id) { // Verifica si existe un elemento con un ID dado
      return this.#data[id] === undefined ? false : true;
    }
    #checkThatElementExistsWithId(id) { // Verifica que exista un elemento con un ID dado
      if (!this.#existElementWithId(id)) {
        throw new Error("This element not exists")}
    }
    create(data) { // Crea un nuevo registro
      this.#data.push(data);
      this.#save();
      return this.#data.length;
    }
    read(id) { // Obtiene un registro por ID
      this.#checkThatElementExistsWithId(id);
      return this.#data[id];
    }
    readAll() { // Obtiene todos los registros
      return this.#data;
    }
    update(id, data) { // Actualiza un registro
      this.#checkThatElementExistsWithId(id);
      this.#data[id] = data;
      this.#save();
      return true;
    }
    delete(id) { // Elimina un registro
      this.#checkThatElementExistsWithId(id);
      this.#data.splice(id, 1);
      this.#save();
      return true;
    }
}