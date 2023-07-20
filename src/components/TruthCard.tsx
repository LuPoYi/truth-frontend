import { useRef, useState } from "react"

import Image from "next/image"
import { OPENSEA_URL } from "@/constants"
import { useAccount, useNetwork } from "wagmi"

interface TruthCardProps {
  tokenId: number
  description: string
  imageURL: string
  toAddress?: string
  onClick: (tokenId: number, toAddress: string, text: string) => void
}

export function TruthCard({
  tokenId,
  description,
  imageURL,
  toAddress,
  onClick,
}: TruthCardProps) {
  const [text, setText] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const { address } = useAccount()
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

        <div
          className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-4 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle"
        >
          <form className="w-full max-w-sm">
            <div className="flex items-center border-b border-gray-700 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                ref={inputRef}
                onChange={(e) => setText(e.target.value)}
                placeholder="Your Truth"
              />

              <button
                className="flex-shrink-0 bg-teal-500 enabled:hover:bg-teal-700 border-teal-500 enabled:hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:opacity-75"
                type="button"
                disabled={!(toAddress && text.length)}
                onClick={() =>
                  toAddress &&
                  inputRef.current &&
                  onClick(tokenId, toAddress, text)
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
