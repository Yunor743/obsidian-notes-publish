import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {useRouter} from 'next/router'
import {styled} from '@mui/material/styles';

const TCTreeItem = styled(TreeItem)(({theme}) => ({
    '& .MuiTreeItem-content': {
        '& .MuiTreeItem-label': {
            fontSize: '1rem',
            paddingLeft: '6px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,',
            lineHeight: 2.0,
        },
    },
}))

function foldersContainingTargetNode(array, node, target_route_path) {
    if (node.routePath == decodeURIComponent(target_route_path)) {
        var ret = structuredClone(array)
        ret.push(node.id)
        return ret
    } else if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i]
            var copiedArr = structuredClone(array)
            var copiedArr = foldersContainingTargetNode(copiedArr, child, target_route_path)
            if (copiedArr.length != array.length) {
                copiedArr.push(node.id)
                return copiedArr
            }
        }
    }
    return array
}

function removeDuplicates(arr) {
    return Array.from(new Set(arr));
}

export default function FolderTree(props) {
    const renderTree = (nodes) => (
        // <TCTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        <TCTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name.slice(-3) == ".md" ? nodes.name.slice(0, -3) : nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TCTreeItem>
    );

    const router = useRouter()
    // const childrenNodeIds = props.tree.children.map(aNode => {return aNode.id})

    //const expandedNodes = [props.tree.id]

    var expandedNodes = []
    if ((router.asPath == "/" && router.route != "/note/[id]") || ( router.route == "/note/[id]" && router.asPath == "/note/__index")) {
        if (props.tree.children && props.tree.children.length > 0) {
            props.tree.children.forEach(function(child) {
                expandedNodes.push(child.id)
            })
        }
    }
    if (router.asPath != "/" && router.route == "/note/[id]") {
        var expandedNodes = foldersContainingTargetNode(expandedNodes, props.tree, router.asPath)
    }
    var uniqExpandedNodes = removeDuplicates(expandedNodes)

    return (
        <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpanded={uniqExpandedNodes}
            defaultExpandIcon={<ChevronRightIcon/>}
            onNodeSelect={(event, nodIds) => {
                const currentNode = props.flattenNodes.find(aNode => {
                    return aNode.id === nodIds
                })
                if (currentNode != null && currentNode.routePath != null) {
                    // Additional check to ensure it's not a folder containing children
                    if (currentNode.children == null || currentNode.children.length == 0) {
                        router.push(currentNode.routePath)
                        .then(() => {
                            router.reload()
                        })
                    }
                    // router.reload()

                    // if (props.onNodeSelect) {
                    //     props.onNodeSelect()
                    // }
                }
            }}
            sx={{flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}
        >
            { props.tree.children.map((tree) => renderTree(tree)) }
        </TreeView>
    );
}
