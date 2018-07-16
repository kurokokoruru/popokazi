export default {
    getType (item) {
        if (!item.id) {
            return 'none';
        }

        const type = `${item.jobId}-${item.partsId}`;
        switch (type) {
        case '0-0':
        case '1-4':
        case '2-1': {
            return 'type-katateken';
        }
        case '0-7':
        case '1-2':
        case '2-4':
        case '2-6': {
            return 'type-hanma';
        }
        case '0-2':
        case '2-0': {
            return 'type-tanken';
        }
        case '0-1':
        case '1-3': {
            return 'type-ryouteken';
        }
        case '2-3': {
            return 'type-kazihanma';
        }
        case '0-5':
        case '1-0':
        case '1-1':
        case '2-2': {
            return 'type-tume';
        }
        }
    }
};
