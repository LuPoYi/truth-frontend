import { useRef, useState } from 'react';

import Image from 'next/image';
import { OPENSEA_URL } from '@/constants';
import { isAddress } from 'viem';
import { useAccount, useNetwork } from 'wagmi';

interface TruthCardProps {
  tokenId: number
  description: string
  imageURL: string
  ownerOf: string
  onClick: (tokenId: number, toAddress: string, text: string) => void
}

export function TruthCard({
  tokenId,
  description,
  imageURL,
  ownerOf,
  onClick,
}: TruthCardProps) {
  const [text, setText] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [inputAddress, setInputAddress] = useState("")
  const { chain } = useNetwork()

  const isValidAddress = isChecked && isAddress(inputAddress)

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
      <div className="h-64 relative">
        <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
          <small>#{tokenId} Truth:</small> {description}
        </div>

        {ownerOf.length > 0 && (
          <div className="text-lg text-palette-primary p-4 font-primary font-light">
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

        {/* Form */}
        <div
          className="text-palette-dark font-primary font-medium text-base mb-4 pl-4 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle w-full"
        >
          <form className="w-full max-w-sm">
            {/* <div className="flex items-center border-b border-gray-700 py-2">
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
            </div> */}

            <div className="group mb-1">
              <input
                className="relative float-left  mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="checkbox"
                checked={isChecked}
                id="checkboxChecked"
                onChange={() => setIsChecked((prev) => !prev)}
              />
              <label
                className="inline-block pl-[0.15rem] text-sm hover:cursor-pointer"
                htmlFor="checkboxChecked"
              >
                Transfer NFT to Address
              </label>
              {isChecked && (
                <input
                  type="text"
                  className={`peer h-10 w-full rounded-md bg-gray-50 pl-4 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg
                  ${!isValidAddress && "border-2 border-rose-600"}
                  `}
                  placeholder="0x123456789"
                  value={inputAddress}
                  onChange={(e) => setInputAddress(e.target.value)}
                />
              )}
            </div>

            <div className="group">
              <label
                htmlFor="10"
                className="inline-block w-full text-sm font-medium text-black-500 transition-all duration-200 ease-in-out group-focus-within:text-green-400"
              >
                Speak The Truth
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="peer relative h-10 w-full rounded-md bg-gray-50 pl-4 pr-20 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
                  onChange={(e) => setText(e.target.value)}
                />
                <button
                  className="absolute right-2 h-7 w-16 rounded-md bg-blue-200 text-xs font-semibold text-white transition-all duration-200 ease-in-out group-focus-within:bg-blue-400 group-focus-within:hover:bg-blue-600"
                  type="button"
                  disabled={isChecked && !isValidAddress}
                  onClick={() =>
                    onClick(tokenId, isChecked ? inputAddress : ownerOf, text)
                  }
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
