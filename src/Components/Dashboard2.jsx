import React, { Component } from 'react'
import { Modal } from 'antd';
import 'antd/dist/antd.css';
export default class Dashboard2 extends Component {

    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
        this.modalRef = React.createRef();
        this.modalImageRef = React.createRef();
        this.uploadModalRef = React.createRef();
        this.uploadRef = React.createRef();
    }

    state = {
        selectedFiles: [],
        validFiles: [],
        unsupportedFiles: [],
        errorMessage: '',
        isModalVisible: false,
        finalArray: [],
    }

    render() {

        const { validFiles } = this.state

        const changeAsUseEffect = () => {
            let filteredArr = this.state.selectedFiles.reduce((acc, current) => {
                const x = acc.find(item => item.name === current.name);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);
            this.setState({ validFiles: [...filteredArr] })
        }

        const dragOver = (e) => {
            e.preventDefault()
        }

        const dragEnter = (e) => {
            e.preventDefault()
        }

        const dragLeave = (e) => {
            e.preventDefault()
        }

        const fileDrop = (e) => {
            e.preventDefault()
            const files = e.dataTransfer.files;
            if (files.length) {
                handleFiles(files);
            }
        }

        const filesSelected = () => {
            if (this.fileInputRef.current.files.length) {
                handleFiles(this.fileInputRef.current.files);
            }
        }

        const fileInputClicked = () => {
            this.fileInputRef.current.click();
        }

        const handleFiles = (files) => {
            let prevArray = [...this.state.selectedFiles];
            for (let i = 0; i < files.length; i++) {
                prevArray.push(files[i])
                if (validateFile(files[i])) {
                    this.setState({ selectedFiles: [...prevArray] }, () => {
                        changeAsUseEffect();
                    });
                } else {
                    files[i]['invalid'] = true;
                    this.setState({ selectedFiles: [...prevArray] });
                    this.setState({ errorMessage: 'File type not permitted' });
                    this.setState({ unsupportedFiles: [...prevArray] }, () => {
                        changeAsUseEffect();
                    });
                }
            }
        }

        const validateFile = (file) => {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
            if (validTypes.indexOf(file.type) === -1) {
                return false;
            }
            return true;
        }

        const fileSize = (size) => {
            if (size === 0) {
                return '0 Bytes';
            }
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(size) / Math.log(k));
            return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        const fileType = (fileName) => {
            return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
        }

        const removeFile = (name) => {
            const index = this.state.validFiles.findIndex(e => e.name === name);
            const index2 = this.state.selectedFiles.findIndex(e => e.name === name);
            const index3 = this.state.unsupportedFiles.findIndex(e => e.name === name);
            this.state.validFiles.splice(index, 1);
            this.state.selectedFiles.splice(index2, 1);
            this.setState({ setValidFiles: [...this.state.validFiles] }, () => {
                changeAsUseEffect();
            })
            this.setState({ setSelectedFiles: [...this.state.selectedFiles] })
            if (index3 !== -1) {
                this.state.unsupportedFiles.splice(index3, 1);
                this.setState({ setUnsupportedFiles: [...this.state.unsupportedFiles] }, () => {
                    changeAsUseEffect();
                })
            }
        }

        const openImageModal = (file) => {
            const reader = new FileReader();
            this.modalRef.current.style.display = "block";
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
            }
        }

        const closeModal = () => {
            this.modalRef.current.style.display = "none";
            this.modalImageRef.current.style.backgroundImage = 'none';
        }

        const uploadFiles = async () => {
            this.setState({ isModalVisible: true })
        }

        const closeUploadModal = () => {
            this.uploadModalRef.current.style.display = 'none';
        }

        const uploadOnBucket = () => {
            // You can add your code here
            this.setState({ validFiles: [], selectedFiles: [], isModalVisible: false })
            // If upload on bucket is successful then add above code it will close the modal popup and clear the selected files
        }

        return (
            <div>
                <section className="file_upload_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="file_upload_sec">
                                    <div className="upload_form">
                                        {this.state.unsupportedFiles.length > 0 ? <p>Please remove all unsupported files.</p> : ''}
                                        <div className="drop-container"
                                            onDragOver={dragOver}
                                            onDragEnter={dragEnter}
                                            onDragLeave={dragLeave}
                                            onDrop={fileDrop}
                                            onClick={fileInputClicked}>
                                            <div className="drop-message">
                                                <div className="upload-icon"></div>Drag & Drop files here or click to select file(s)
                                            </div>
                                            <input
                                                ref={this.fileInputRef}
                                                className="file-input"
                                                type="file"
                                                id="FIP_PIC"
                                                multiple
                                                onChange={filesSelected} />
                                        </div>
                                        <div className={this.state.selectedFiles.length > 0 ? "file-display-container" : "file-display-container d-none"}>
                                            {this.state.selectedFiles && this.state.selectedFiles.map((data, i) =>
                                                <div className="file-status-bar" key={i}>
                                                    <div onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)}>
                                                        <div className="file-type-logo"></div>
                                                        <div className="file-type">{fileType(data.name)}</div>
                                                        <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                                                        <span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({this.state.errorMessage})</span>}
                                                    </div>
                                                    <div className="file-remove" onClick={() => removeFile(data.name)}>X</div>
                                                </div>
                                            )}
                                        </div>
                                        {this.state.unsupportedFiles.length === 0 && this.state.validFiles.length ? <button className="file-upload-btn" onClick={() => uploadFiles()}>Submit Files</button> : ''}
                                    </div>
                                </div>
                                <div className="modal" ref={this.modalRef}>
                                    <div className="overlay"></div>
                                    <span className="close" onClick={(() => closeModal())}>X</span>
                                    <div className="modal-image" ref={this.modalImageRef}></div>
                                </div>

                                <div className="upload-modal" ref={this.uploadModalRef}>
                                    <div className="overlay"></div>
                                    <div className="close" onClick={(() => closeUploadModal())}>X</div>
                                </div>
                                {this.state.isModalVisible &&
                                    <Modal title="Upload Files" visible={this.state.isModalVisible} onOk={uploadOnBucket} onCancel={() => this.setState({ isModalVisible: !this.state.isModalVisible })}>
                                        <p>
                                            {Object.keys(validFiles).map((keyName, i) => (
                                                <li className="travelcompany-input" key={i}>
                                                    <div className="input-label"><strong>File Name:</strong> {validFiles[keyName].name}</div>
                                                    <div className="input-label"><strong>File Size: </strong>{fileSize(validFiles[keyName].size)}</div>
                                                </li>
                                            ))}
                                        </p>
                                    </Modal>}
                            </div>
                        </div>
                    </div>
                </section>
            </div >

        )
    }
}
