import {beforeEach,describe,expect,it,vi} from "vitest";
import {createHmac} from "node:crypto";
import {assetUrl,uploadedFile,createTryOn,uploadSlot} from "../lib/fitreceipt";
import {sign} from "../lib/security";
beforeEach(()=>{vi.unstubAllGlobals();process.env.SESSION_SECRET="test-session-secret-with-at-least-32-characters";process.env.TWITCH_WEBHOOK_SECRET="test-webhook-secret-with-at-least-32-characters";});
describe("YouCam ownership and provider contract",()=>{
 it("rejects another session's upload token",()=>expect(()=>uploadedFile(sign({kind:"youcam-upload",owner:"alice",fileId:"file",exp:Date.now()+60000}),"bob")).toThrow("belong"));
 it("blocks non-provider image hosts and credentials",()=>{expect(()=>assetUrl("http://127.0.0.1/image")).toThrow();expect(()=>assetUrl("https://evil.example/image")).toThrow();expect(()=>assetUrl("https://user:pass@yce-us.s3-accelerate.amazonaws.com/a")).toThrow();});
 it("returns signed upload ownership and no provider credential",async()=>{process.env.YOUCAM_API_KEY="test-youcam-key";vi.stubGlobal("fetch",vi.fn().mockResolvedValue(Response.json({data:{files:[{file_id:"file-a",requests:[{url:"https://yce-us.s3-accelerate.amazonaws.com/a",method:"PUT",headers:{"Content-Type":"image/jpg"}}]}]}})));const slot=await uploadSlot("alice",{consent:true,name:"a.jpg",size:500,type:"image/jpeg"});expect(uploadedFile(slot.token,"alice")).toBe("file-a");expect(JSON.stringify(slot)).not.toContain("test-youcam-key");});
 it("uses the documented cloth-v4 payload",async()=>{process.env.YOUCAM_API_KEY="test-key";const token=sign({kind:"youcam-upload",owner:"alice",fileId:"file-a",exp:Date.now()+60000});const f=vi.fn().mockResolvedValue(Response.json({data:{task_id:"task-1"}}));vi.stubGlobal("fetch",f);await createTryOn("alice",{consent:true,source:token,garment:token,category:"outer"});expect(f.mock.calls[0][0]).toContain("/task/cloth-v4");expect(JSON.parse(f.mock.calls[0][1].body)).toEqual({src_file_id:"file-a",ref_file_id:"file-a",garment_category:"outer"});});
});
