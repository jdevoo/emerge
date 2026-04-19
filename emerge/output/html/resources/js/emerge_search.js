function edgeBetweenSearchTerms(sourceNode, targetNode) {
    let found = false
    searchTerms.forEach(element => {
        if (matches(element, sourceNode.id) && matches(element, targetNode.id)) {
            found = true
        }
    });
    return found
}

function searchTermsIncludedInNodeTags(sourceNode, targetNode) {
    let found = false
    searchTerms.forEach(element => {
        if ((stringIncludedInNodeTags(element, sourceNode) && stringIncludedInNodeTags(element, targetNode))) {
            found = true
        }
    });
    return found
}

function searchTermsIncludedInNodeContributors(sourceNode, targetNode) {
    let found = false
    searchTerms.forEach(element => {
        if ((stringIncludedInNodeContributors(element, sourceNode) && stringIncludedInNodeContributors(element, targetNode))) {
            found = true
        }
    });
    return found
}

function normalSearch(node) {
    let found = false
    searchTerms.forEach(element => {
        if (matches(element, node.id)) {
            found = true
        }
    });
    return found
}

function searchTermIncludedInNode(node) {
    let found = false
    searchTerms.forEach(element => {
        if (matches(element, node.id)) {
            found = true
        }
    });
    return found
}

function searchTermIncludedInNodeTags(node) {
    let found = false
    searchTerms.forEach(element => {
        if ( stringIncludedInNodeTags(element, node) ) {
            found = true
        }
    });
    return found
}

function searchTermIncludedInNodeContributors(node) {
    let found = false
    searchTerms.forEach(element => {
        if ( stringIncludedInNodeContributors(element, node) ) {
            found = true
        }
    });
    return found
}
