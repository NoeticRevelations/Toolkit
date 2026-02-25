import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const CustomTasks: QuartzTransformerPlugin = () => {
  return {
    name: "CustomTasks",
    markdownPlugins() {
      return [
        () => {
          return (tree, file) => {
            visit(tree, "listItem", (node: any) => {
              if (node.children && node.children.length > 0 && node.children[0].type === "paragraph") {
                const p = node.children[0]
                if (p.children && p.children.length > 0 && p.children[0].type === "text") {
                  const textNode = p.children[0]
                  
                  // Look for [char] at the start of a list item
                  const match = textNode.value.match(/^\[(.)\]\s+/)
                  
                  if (match) {
                    const char = match[1]
                    // Skip standard GFM checkboxes (space, x, X) as Quartz handles those natively
                    if (char !== " " && char !== "x" && char !== "X") {
                      // Remove the "[?] " from the text
                      textNode.value = textNode.value.slice(match[0].length)
                      
                      // Add the data-task attribute to the <li> element
                      node.data = node.data || {}
                      node.data.hProperties = node.data.hProperties || {}
                      node.data.hProperties["data-task"] = char
                      
                      if (!node.data.hProperties.className) {
                        node.data.hProperties.className = []
                      } else if (typeof node.data.hProperties.className === "string") {
                        node.data.hProperties.className = [node.data.hProperties.className]
                      }
                      node.data.hProperties.className.push("task-list-item")
                      
                      // Inject the hidden checkbox input that the CSS targets
                      const input = {
                        type: "html",
                        value: `<input type="checkbox" checked data-task="${char}" class="task-list-item-checkbox" disabled />`
                      }
                      p.children.unshift(input)
                    }
                  }
                }
              }
            })
          }
        }
      ]
    }
  }
}
