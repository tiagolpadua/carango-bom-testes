import ServiceUtils from "./ServiceUtils";

const DashboardService = {
  listar() {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/dashboard', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ServiceUtils.getJWT()
        },
      })
    );
  },
};

export default DashboardService;