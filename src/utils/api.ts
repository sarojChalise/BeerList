import 'whatwg-fetch';

//GET API CALL HELPER FUNCTION
const getData = async (url:string) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        if (response.status === 200) {
            return response.json();
        }
        else {
            const error = new Error(response.statusText)
            throw error
        }
    }
    catch (err ) {
        if (err instanceof Error && err.message === 'Failed to fetch') {
            return new Error('internet error');
        }
        return err;
    }

}
export default getData