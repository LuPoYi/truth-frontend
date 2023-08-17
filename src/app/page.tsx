"use client"

import { useEffect, useRef, useState } from "react"

import { CONTRACT_ADDRESS } from "@/constants"
import { TruthCard } from "@/components/TruthCard"
import { readContract, watchReadContract } from "@wagmi/core"
import toast, { Toaster } from "react-hot-toast"
import truthABI from "@/contracts/truth-abi.json"
import { useAccount, useContractRead, useContractWrite } from "wagmi"

const TOKEN_ID = 1

const truthContract: Record<string, any> = {
  address: CONTRACT_ADDRESS,
  abi: truthABI,
}

const notifyTruthChanged = () => toast.success("The Truth Changed!")

export default function Home() {
  const { address } = useAccount()
  const isFirstRender = useRef(true)
  const [tokenURI, setTokenURI] = useState("")
  const [ownerOf, setOwnerOf] = useState("")
  const [tokenId, setTokenId] = useState({
    name: "",
    description: "",
    image: "",
  })

  watchReadContract(
    {
      address: CONTRACT_ADDRESS,
      abi: truthABI,
      functionName: "tokenURI",
      args: [TOKEN_ID],
      listenToBlock: true,
    },
    (_tokenURI) => {
      if (_tokenURI && _tokenURI.toString() !== tokenURI) {
        const fetchOwnerOf = async () => {
          const _ownerOf = await readContract({
            address: CONTRACT_ADDRESS,
            abi: truthABI,
            functionName: "ownerOf",
            args: [TOKEN_ID],
          })

          setOwnerOf(String(_ownerOf))
        }

        fetchOwnerOf()

        setTokenURI(_tokenURI.toString())
      }
    }
  )

  const { write: speakTheTruth, isSuccess } = useContractWrite({
    ...truthContract,
    functionName: "SpeakTheTruth",
  })

  const handleSpeakTheTruthOnClick = async (
    tokenId: number,
    toAddress: string,
    text: string = "Hi"
  ) => {
    // get next eth rate i.g. 10303n
    const nextUpdateFee = await readContract({
      address: CONTRACT_ADDRESS,
      abi: truthABI,
      functionName: "getNextUpdateFee",
    })

    speakTheTruth({
      args: [tokenId, toAddress, text],
      value: nextUpdateFee as bigint,
    })
  }

  useEffect(() => {
    if (!tokenURI.length) return

    isFirstRender.current
      ? (isFirstRender.current = false)
      : notifyTruthChanged()

    fetch(tokenURI)
      .then((res) => res.json())
      .then((respData) => setTokenId(respData))
  }, [tokenURI])

  return (
    <main className="gradient leading-relaxed tracking-wide flex flex-col">
      <div className="container mx-auto h-screen">
        <TruthCard
          tokenId={TOKEN_ID}
          description={tokenId.description}
          imageURL={tokenId.image}
          ownerOf={ownerOf}
          onClick={handleSpeakTheTruthOnClick}
        />
      </div>
      <Toaster />
    </main>
  )
}
