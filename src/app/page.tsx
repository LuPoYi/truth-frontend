"use client"

import { useEffect, useState } from "react"
import truthABI from "@/contracts/truth-abi.json"
import { CONTRACT_ADDRESS } from "@/constants"
import { readContract } from "@wagmi/core"
import { watchReadContract } from "@wagmi/core"

import { useAccount, useContractRead, useContractWrite } from "wagmi"
import { TruthCard } from "@/components/TruthCard"

const truthContract: Record<string, any> = {
  address: CONTRACT_ADDRESS,
  abi: truthABI,
}

export default function Home() {
  const { address } = useAccount()
  const [tokenURI, setTokenURI] = useState("")
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
      args: [0],
      listenToBlock: true,
    },
    (_tokenURI) => {
      _tokenURI &&
        _tokenURI.toString() !== tokenURI &&
        setTokenURI(_tokenURI.toString())
    }
  )

  const { write: speakTheTruth } = useContractWrite({
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

    fetch(tokenURI)
      .then((res) => res.json())
      .then((respData) => setTokenId(respData))

    //   {
    //     "name": "Truth",
    //     "description": "MussinaBoy",
    //     "image": "https://fakeimg.pl/500x500/?text=MussinaBoy"
    // }

    // https://www.fakejson.online/api/json?name=Truth&description=MussinaBoy&image=https://fakeimg.pl/500x500/?text=MussinaBoy
  }, [tokenURI])

  return (
    <main className="gradient leading-relaxed tracking-wide flex flex-col">
      <div className="container mx-auto h-screen">
        <TruthCard
          tokenId={0}
          description={tokenId.description}
          imageURL={tokenId.image}
          toAddress={address}
          onClick={handleSpeakTheTruthOnClick}
        />
      </div>
    </main>
  )
}
