exports.dbError = (error) => {
        if (error.code === '23505') return {status: 406, data: error.detail};
        if (error.code === '23503') return {status: 406, data: error.detail};
        return {status: 500, data: error.code};
}

