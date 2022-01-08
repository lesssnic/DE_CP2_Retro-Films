exports.dbError = (error) => {
        if (error.code === '23505') return {status: 406, error: error.detail};
        return {status: 500, error: error.code};
}

