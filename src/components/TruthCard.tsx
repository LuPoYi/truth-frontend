import { useRef, useState } from "react"

import Image from "next/image"
import { OPENSEA_URL } from "@/constants"
import { useAccount, useNetwork } from "wagmi"

interface TruthCardProps {
  tokenId: number
  description: string
  imageURL: string
  ownerOf: string
  toAddress?: string
  onClick: (tokenId: number, toAddress: string, text: string) => void
}

export function TruthCard({
  tokenId,
  description,
  imageURL,
  ownerOf,
  toAddress,
  onClick,
}: TruthCardProps) {
  const [text, setText] = useState("")
  const { chain } = useNetwork()

  return (
    <div className="h-120 w-96 rounded shadow-lg mx-auto border border-palette-lighter">
      <div className="h-96 border-b-2 border-palette-lighter relative">
        <a
          href={`${OPENSEA_URL}/${tokenId}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {imageURL && (
            <Image
              src={imageURL}
              alt={description}
              layout="fill"
              className="transform duration-500 ease-in-out hover:scale-110"
            />
          )}
        </a>
      </div>
      <div className="h-48 relative">
        <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
          <small>Truth:</small> {description}
        </div>

        {ownerOf.length > 0 && (
          <div className="text-lg text-gray-600 p-4 font-primary font-light">
            NFT Owner:
            <a
              href={`${chain?.blockExplorers?.default.url}/address/${ownerOf}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {`${ownerOf.slice(0, 6)}...${ownerOf.slice(-4)}`}
            </a>
          </div>
        )}

        <div
          className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-4 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle"
        >
          <form className="w-full max-w-sm">
            <div className="flex items-center border-b border-gray-700 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                onChange={(e) => setText(e.target.value)}
                placeholder="Your Truth"
              />

              <button
                className="flex-shrink-0 bg-teal-500 enabled:hover:bg-teal-700 border-teal-500 enabled:hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:opacity-75"
                type="button"
                disabled={!(toAddress && text.length)}
                onClick={() =>
                  toAddress && text.length && onClick(tokenId, toAddress, text)
                }
              >
                Speak The Truth
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
