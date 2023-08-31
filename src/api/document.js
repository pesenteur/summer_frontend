import requests from "@/utils/request";

export default {
    createDocuments(team, title, project) {
        return requests({
            url: '/documents',
            method: 'POST',
            data: {
                team, title, project
            }
        });
    },
    saveDocument(document, content) {
        return requests({
            url: '/documents/save',
            method: 'POST',
            data: {
                document, content
            }
        });
    }
}