import requests from "@/utils/request";

export default {
    saveDocument(document, content) {
        console.log(document, content)
        return requests({
            url: '/documents/save',
            method: 'POST',
            data: {
                document, content
            }
        });
    },
    updateDocument(title, project, documentId) {
        return requests({
            url: `documents/${documentId}`,
            method: 'PATCH',
            data: {
                title, project
            }
        });
    },
    createDocument(project, title, folder) {
        return requests({
            url: '/documents',
            method: 'POST',
            data: {
                project, title, folder
            }
        });
    },
    deleteDocument(project, documentId) {
        return requests({
            url: `/documents/${documentId}`,
            method: 'DELETE',
            params: {
                project
            }
        });
    },
    createFolder(name, project) {
        console.log(name, project)
        return requests({
            url: '/document-folders',
            method: 'POST',
            data: {
                name, project
            }
        });
    },
    deleteFolder(project, folderId) {
        return requests({
            url: `/document-folders/${folderId}`,
            method: 'DELETE',
            data: {
                project
            }
        });
    },
    getAllDocuments(project) {
        return requests({
            url: '/docments/tree',
            method: 'GET',
            params: {
                project
            }
        })
    },
    getDocumentContent(document) {
        return requests({
            url: '/documents/read',
            method: 'GET',
            params: {
                document
            }
        });
    },
    createShareLink(document, editable) {
        return requests({
            url: '/documents/authorize',
            method: 'PATCH',
            data: {
                document, editable
            }
        });
    },
    processAt(document, receiver) {
        return requests({
            url: '/documents/mention',
            method: 'POST',
            data: {
                document, receiver
            }
        });
    },
    cancelShare(document) {
        return requests({
            url: '/documents/deauthorize',
            method: 'PATCH',
            data: {
                document
            }
        });
    },getHistory(document,project){
        return requests({
            url: '/documents/history',
            method: 'GET',
            params: {
                document, project
            }
        });
    },restore(document_history){
        return requests({
            url: '/documents/restore',
            method: 'PATCH',
            data: {
                document_history
            }
        });
    }

}