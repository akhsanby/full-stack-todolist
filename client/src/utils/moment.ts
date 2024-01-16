import moment from "moment";
import "moment/locale/id.js";

const dateTime = moment().locale("id").format("Do MMM YYYY, HH:mm");

export default dateTime;
