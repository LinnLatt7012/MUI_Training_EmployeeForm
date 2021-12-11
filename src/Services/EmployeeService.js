const KEYS ={
    employees:"employees",
    employeeId:"employeeId"
}
export const getDepartmentCollection =()=>([
    {id:'1',title: 'HR'},
    {id:'2',title: 'IT'},
    {id:'3',title: 'Accounting'},
    {id:'4',title: 'Marketing'}
])

export function insertEmployee(data){
    let employees = getallEmployees()
    data['id']=generatemployeeId()
    employees.push(data)
    localStorage.setItem(KEYS.employees,JSON.stringify(employees))
}

export function updateEmployee(data){
    let employees = getallEmployees()
   let recordIndex = employees.findIndex(x=>x.id == data.id)
    employees[recordIndex] = {...data}
    localStorage.setItem(KEYS.employees,JSON.stringify(employees))
}

export function deleteEmployee(id){
    let employees = getallEmployees()
    employees = employees.filter(x=>x.id != id)
    localStorage.setItem(KEYS.employees,JSON.stringify(employees))
}
export function generatemployeeId(){
    if(localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId,"0")
    var id = parseInt(localStorage.getItem(KEYS.employeeId));
    localStorage.setItem(KEYS.employeeId,(++id).toString())
    return id
}

export function getallEmployees(){
    if(localStorage.getItem(KEYS.employees) == null)
        localStorage.setItem(KEYS.employees,JSON.stringify([]))
    let employees =JSON.parse(localStorage.getItem(KEYS.employees));
    let deparments = getDepartmentCollection();

    return employees.map(x=>(
        {
            ...x,
            deparment: deparments[x.departmentId-1].title

        }
    ))
}