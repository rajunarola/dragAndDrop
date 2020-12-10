import React, { Component } from 'react'

export default class Dashboard2 extends Component {


    state = {
        fileInputRef: "",
        modalImageRef: "",
        modalRef: "",
        progressRef: "",
        uploadRef: "",
        uploadModalRef: "",
        selectedFiles: [],
        validFiles: [],
        unsupportedFiles: [],
        errorMessage: ''
    }
    render() {
        return (
            <div>
                <section className="file_upload_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="file_upload_sec"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}
