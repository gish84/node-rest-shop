class Tools {
  /**
   * Removes keys with undefined value from object
   * @param {Object} obj
   */
  static removeUndefinedKeys(obj) {
    for (const [key, value] of Object.entries(obj)) {
      if (value === undefined) {
        delete obj[key];
      }
    }
  }

  /**
   * Prepares object with info about error from original error object (because it's not possible to return original error in response - it gets {})
   * @param {Object} error
   * @returns {message: string, stack: string, cause: Object }
   */
  static processError(error) {
    return {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    };
  }
}

module.exports = Tools;
