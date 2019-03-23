import { 
    FATAL_ERROR_OCCURED 
} from "./constants";


export function fatalErrorOccured(message) {
    return {
      type: FATAL_ERROR_OCCURED,
      message,
    };
  }
