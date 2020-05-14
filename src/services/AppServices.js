import axios from 'axios'

const serverPath = 'http://localhost:3000/FakeServer/data/'

const urlCompanies = serverPath + 'companies.json'
const urlAddresses = serverPath + 'company-addresses.json'
const urlEmployees = serverPath + 'employees.json'
const urlProjects = serverPath + 'projects.json'

const AppServices = () => {
	return {
		getCompanies: () => {
			return axios
				.get(urlCompanies)
				.then(response => response.data || {})
				.catch(error => console.error(`Error while getting companies: ${error}`))
		},

		getAddress: (id) => {
			return axios
				.get(urlAddresses)
				.then(response => {
					const address = response ? 
						response.data.find(address => address.companyId === id) : 
						{}

					return address || {}
				})
				.catch(error => console.error(`Error while getting company address: ${error}`))
		},

		getEmployees: () => {
			return axios
				.get(urlEmployees)
				.then(response => response.data || {})
				.catch(error => console.error(`Error while getting emlpoyees: ${error}`))
		},

		getProjects: () => {
			return axios
				.get(urlProjects)
				.then(response => response.data || [])
				.catch(error => console.error(`Error while getting projects: ${error}`))
		},

		getCompanyProjects: (id) => {
			return axios
				.get(urlProjects)
				.then(response => {
					const projects = response.data.filter(project => project.companyId === id)

					return projects || []
				})
				.catch(error => console.error(`Error while getting projects: ${error}`))
		}
	}
}

export default AppServices()
