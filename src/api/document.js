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
    }
}