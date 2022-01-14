export default function friends(){
    return(
        <main>
            <div className="container-md my-5">
                <h2 className="text-center pb-3">Meine Freunde</h2>
                <div className="friends-container">
                    
                    <div className="friend-row row justify-content-center pb-3">
                        <div className="friend col-10 col-sm-7 col-lg-5 py-2 px-4">
                            <div className="row justify-content-between">
                                <div className="col-10">
                                    <div className="row">
                                        <div className="col-2">
                                            <div className="playerNotice-Img"></div>
                                        </div>
                                        <div className="col-10">
                                            <p className="m-0 playerNotice-name">Player123456</p>
                                            <p className="m-0 playerNotice-time">vor 6 Stunden</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1 playerNotice-arrow"></div>
                            </div>
                        </div>
                    </div>

                    <div className="friend-row row justify-content-center pb-3">
                        <div className="friend col-10 col-sm-7 col-lg-5 py-2 px-4">
                            <div className="row justify-content-between">
                                <div className="col-10">
                                    <div className="row">
                                        <div className="col-2">
                                            <div className="playerNotice-Img"></div>
                                        </div>
                                        <div className="col-10">
                                            <p className="m-0 playerNotice-name">Player123456</p>
                                            <p className="m-0 playerNotice-time">vor 6 Stunden</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1 playerNotice-arrow"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-3 row justify-content-center">
                    <button className="btn col-10 col-sm-6 col-lg-4 btn-primary-color p-3"><i className="fas fa-plus"></i> Freunde hinzufügen</button>
                </div>    
            </div>
        </main>
    )
}