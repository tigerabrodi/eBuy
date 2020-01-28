import React, {Fragment} from 'react';

const Spinner = () => {
    return (
        <Fragment>
            <div class="text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </Fragment>
    );
}

export default Spinner;
