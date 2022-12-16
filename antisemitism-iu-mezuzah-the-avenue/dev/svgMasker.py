import xml.dom.minidom as md
import lxml.etree as ET

# Settings
inputFile = 'audio-quote-05.svg'
outputFile = 'maskedSVG'
pathsContainerID = 'paths'
masksContainerID = 'masks'
maskIDPrefix = 'm'


def main():
    tree = ET.parse(inputFile)
    root = tree.getroot()

    # Character paths
    paths = root.findall(
        ".//{http://www.w3.org/2000/svg}g[@id='%s']/*" % pathsContainerID)

    # Link respective mask to each path
    for path in paths:
        path.attrib["mask"] = "url(#%s-%s)" % (maskIDPrefix, path.attrib["id"])

    # # Character masks
    # maskContainer = root.findall(
    #     ".//{http: // www.w3.org/2000/svg}g[@id='%s']" % masksContainerID)
    # masks = root.findall(
    #     ".//{http://www.w3.org/2000/svg}g[@id='%s']/*" % masksContainerID)

    # # print(masks)

    # for mask in masks:
    #   newParent = ET.Element("mask", id="%s-%s" %
    #                          (maskIDPrefix, mask.attrib["id"]))
    #   print(mask)

    #   # newParent.extend(mask)
    #   # ET.SubElement(newParent, mask)
    #   ET.SubElement(newParent, "mask")
    #   # ET.SubElement(maskContainer, newParent)
    #   # maskContainer.extend(newParent)

    # Output result
    tree.write('%s.svg' % outputFile, pretty_print=True)


if __name__ == "__main__":
    main()
